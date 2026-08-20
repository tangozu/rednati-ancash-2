'use client'

import React, { useMemo } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import type { LatLngBoundsExpression, LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './map-markers.css'
import { cn } from '@/utilities/ui'

export type RouteMarker = {
  id: string
  lat: number
  lon: number
  imageUrl: string
  alt: string
  caption: string | null
}

type LeafletMapProps = {
  points: { lat: number; lon: number }[]
  bounds: { minLat: number; maxLat: number; minLon: number; maxLon: number }
  markers?: RouteMarker[]
  className?: string
}

const markerIcon = (imageUrl: string, alt: string) =>
  L.divIcon({
    html: `<span class="route-map-marker-pin"><img src="${imageUrl}" alt="${alt.replace(/"/g, '&quot;')}" /></span>`,
    className: 'route-map-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  })

export const LeafletMap: React.FC<LeafletMapProps> = ({
  points,
  bounds,
  markers = [],
  className,
}) => {
  const positions = useMemo<LatLngExpression[]>(
    () => points.map((p) => [p.lat, p.lon] as LatLngExpression),
    [points],
  )

  const leafletBounds = useMemo<LatLngBoundsExpression>(
    () => [
      [bounds.minLat, bounds.minLon],
      [bounds.maxLat, bounds.maxLon],
    ],
    [bounds],
  )

  return (
    <MapContainer
      bounds={leafletBounds}
      boundsOptions={{ padding: [24, 24] }}
      className={cn('route-map-container', className)}
      scrollWheelZoom={false}
    >
      <TileLayer
        className="route-map-tiles"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={positions} pathOptions={{ color: 'var(--color-earth)', weight: 4 }} />

      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.lat, marker.lon]}
          icon={markerIcon(marker.imageUrl, marker.alt)}
        >
          <Popup>
            <div className="w-48">
              <img
                src={marker.imageUrl}
                alt={marker.alt}
                className="mb-2 h-32 w-full rounded object-cover"
              />
              {marker.caption && <p className="text-sm">{marker.caption}</p>}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
