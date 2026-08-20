export type GpxPoint = {
  lat: number
  lon: number
  /** Elevation in meters, if present in the GPX file */
  ele: number | null
}

export type GpxTrack = {
  points: GpxPoint[]
  /** Total horizontal distance in meters, computed via the haversine formula */
  distanceMeters: number
  /** Total positive elevation gain in meters, or null if the file has no elevation data */
  elevationGainMeters: number | null
  minEle: number | null
  maxEle: number | null
  bounds: {
    minLat: number
    maxLat: number
    minLon: number
    maxLon: number
  } | null
}

const TRKPT_REGEX = /<trkpt\b([^>]*)>([\s\S]*?)<\/trkpt>|<trkpt\b([^>]*)\/>/g
const ATTR_REGEX = (name: string) => new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i')
const ELE_REGEX = /<ele>\s*([\-0-9.]+)\s*<\/ele>/i

const EARTH_RADIUS_METERS = 6371000

function haversineDistance(a: GpxPoint, b: GpxPoint): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)

  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(h))
}

/**
 * Extracts track points from raw GPX XML without a full XML parser dependency.
 * GPX track points always follow the predictable `<trkpt lat="" lon=""><ele>...</ele></trkpt>` shape,
 * so a targeted regex scan is sufficient and keeps this parseable at build/request time on the server.
 */
export function parseGpx(xml: string): GpxTrack | null {
  const points: GpxPoint[] = []

  let match: RegExpExecArray | null
  TRKPT_REGEX.lastIndex = 0
  while ((match = TRKPT_REGEX.exec(xml)) !== null) {
    const attrs = match[1] ?? match[3] ?? ''
    const body = match[2] ?? ''

    const latStr = attrs.match(ATTR_REGEX('lat'))?.[1]
    const lonStr = attrs.match(ATTR_REGEX('lon'))?.[1]
    if (!latStr || !lonStr) continue

    const lat = Number.parseFloat(latStr)
    const lon = Number.parseFloat(lonStr)
    if (Number.isNaN(lat) || Number.isNaN(lon)) continue

    const eleStr = body.match(ELE_REGEX)?.[1]
    const ele = eleStr !== undefined ? Number.parseFloat(eleStr) : null

    points.push({ lat, lon, ele: Number.isNaN(ele as number) ? null : ele })
  }

  if (points.length === 0) return null

  let distanceMeters = 0
  let elevationGainMeters: number | null = null
  let minEle: number | null = null
  let maxEle: number | null = null

  let minLat = points[0]!.lat
  let maxLat = points[0]!.lat
  let minLon = points[0]!.lon
  let maxLon = points[0]!.lon

  for (let i = 0; i < points.length; i++) {
    const point = points[i]!

    minLat = Math.min(minLat, point.lat)
    maxLat = Math.max(maxLat, point.lat)
    minLon = Math.min(minLon, point.lon)
    maxLon = Math.max(maxLon, point.lon)

    if (point.ele !== null) {
      minEle = minEle === null ? point.ele : Math.min(minEle, point.ele)
      maxEle = maxEle === null ? point.ele : Math.max(maxEle, point.ele)
    }

    if (i > 0) {
      const prev = points[i - 1]!
      distanceMeters += haversineDistance(prev, point)

      if (prev.ele !== null && point.ele !== null) {
        const delta = point.ele - prev.ele
        if (delta > 0) {
          elevationGainMeters = (elevationGainMeters ?? 0) + delta
        }
      }
    }
  }

  return {
    points,
    distanceMeters,
    elevationGainMeters,
    minEle,
    maxEle,
    bounds: { minLat, maxLat, minLon, maxLon },
  }
}
