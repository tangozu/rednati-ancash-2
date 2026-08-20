import React, { HTMLAttributes } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Media, RouteMapBlock as RouteMapBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getServerSideURL } from '@/utilities/getURL'
import { parseGpx } from '@/utilities/parseGpx'
import { Reveal } from '@/components/Reveal'
import { LeafletMap } from './LeafletMapClient'
import type { RouteMarker } from './LeafletMap'

const DIFFICULTY_LABELS: Record<string, string> = {
  facil: 'Fácil',
  moderada: 'Moderada',
  dificil: 'Difícil',
  'muy-dificil': 'Muy difícil',
}

const mediaToMarker = (media: Media, caption?: string | null): RouteMarker | null => {
  if (typeof media.latitude !== 'number' || typeof media.longitude !== 'number') return null
  if (!media.url) return null

  return {
    id: media.id,
    lat: media.latitude,
    lon: media.longitude,
    imageUrl: getMediaUrl(media.url, media.updatedAt),
    alt: media.alt ?? '',
    caption: caption ?? null,
  }
}

export const RouteMapBlock: React.FC<RouteMapBlockProps & HTMLAttributes<HTMLElement>> = async ({
  label,
  difficulty,
  gpxFile,
  markers,
  autoIncludeGpsMedia,
  className,
}) => {
  if (!gpxFile || typeof gpxFile !== 'object' || !gpxFile.url) return null

  const gpxUrl = getMediaUrl(gpxFile.url, gpxFile.updatedAt)
  const absoluteUrl = gpxUrl.startsWith('http') ? gpxUrl : `${getServerSideURL()}${gpxUrl}`

  const res = await fetch(absoluteUrl, { next: { revalidate: 3600 } })
  if (!res.ok) return null

  const xml = await res.text()
  const track = parseGpx(xml)

  if (!track || !track.bounds) return null

  const routeMarkers = new Map<string, RouteMarker>()

  for (const entry of markers ?? []) {
    if (!entry.image || typeof entry.image !== 'object') continue
    const marker = mediaToMarker(entry.image, entry.caption)
    if (marker) routeMarkers.set(marker.id, marker)
  }

  if (autoIncludeGpsMedia) {
    const payload = await getPayload({ config: configPromise })
    const { docs: gpsMedia } = await payload.find({
      collection: 'media',
      where: {
        and: [{ latitude: { exists: true } }, { longitude: { exists: true } }],
      },
      limit: 0,
    })

    for (const media of gpsMedia) {
      const marker = mediaToMarker(media)
      if (marker && !routeMarkers.has(marker.id)) routeMarkers.set(marker.id, marker)
    }
  }

  const distanceKm = track.distanceMeters / 1000
  const stats = [
    { label: 'Distancia', value: `${distanceKm.toFixed(2)} km` },
    track.elevationGainMeters !== null
      ? { label: 'Desnivel +', value: `${Math.round(track.elevationGainMeters)} m` }
      : null,
    difficulty ? { label: 'Dificultad', value: DIFFICULTY_LABELS[difficulty] ?? difficulty } : null,
  ].filter((s): s is { label: string; value: string } => s !== null)

  return (
    <section className={cn(className)}>
      <div className="mx-auto container">
        {label && (
          <Reveal className="mb-8">
            <span className="font-bold counter-item wrap-break-word font-mono text-base uppercase tracking-[0.25em] text-earth sm:text-lg sm:tracking-[0.4em]">
              {label}
            </span>
          </Reveal>
        )}

        {stats.length > 0 && (
          <Reveal className="mb-8 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <span className="block font-mono text-xs uppercase tracking-widest text-cream/60">
                  {stat.label}
                </span>
                <span className="block font-display text-xl font-bold text-earth sm:text-2xl">
                  {stat.value}
                </span>
              </div>
            ))}
          </Reveal>
        )}

        <Reveal className="overflow-hidden rounded-2xl border-2 border-cream">
          <LeafletMap
            points={track.points}
            bounds={track.bounds}
            markers={Array.from(routeMarkers.values())}
            className="h-105 w-full sm:h-130"
          />
        </Reveal>
      </div>
    </section>
  )
}
