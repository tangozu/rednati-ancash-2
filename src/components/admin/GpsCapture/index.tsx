'use client'

import React, { useEffect, useRef } from 'react'
import { NumberField, useField } from '@payloadcms/ui'
import type { NumberFieldClientProps } from 'payload'

type Gps = { latitude: number; longitude: number }

/**
 * Keyed on filename only: the image optimizer's canvas resize produces a new File
 * with the same `name` but a different `size`/`lastModified` (re-encoded bytes),
 * so those can't be part of the identity or the resized replacement would look
 * like an unrelated file and slip past the re-apply below.
 */
const fileIdentity = (file: File) => file.name

/**
 * Renders the standard number field UI for `latitude`, and — as a side effect —
 * watches the document's `file` field for a newly-picked File and reads its GPS
 * EXIF tags client-side, before the image optimizer's canvas resize (which drops
 * all metadata) or the server-side sharp pass (`withMetadata: false`) can strip them.
 *
 * Every `setValue()` call in Payload's form reducer clears `isModified` on all
 * OTHER fields (see @payloadcms/ui's fieldReducer UPDATE case). The optimizer's
 * async resize also writes back into `file` after our GPS write lands, which wipes
 * `isModified` off `latitude`/`longitude` again — so a debounced `getFormState`
 * response that resolves afterwards can silently overwrite our values with its
 * stale (still-null) copy. This is especially likely in the bulk-upload drawer,
 * where two independent effects (this one and the optimizer's) both react to the
 * same `file` change. To survive it, we cache the parsed GPS result by a stable
 * file identity and re-apply it on every subsequent `file` change that still
 * matches that identity — including the optimizer's resized replacement — so our
 * write is always the most recent one before any server merge can land.
 */
export const GpsCaptureField: React.FC<NumberFieldClientProps> = (props) => {
  const { value: fileValue } = useField<File | null>({ path: 'file' })
  const { setValue: setLatitude } = useField<number | null>({ path: 'latitude' })
  const { setValue: setLongitude } = useField<number | null>({ path: 'longitude' })
  const gpsByIdentity = useRef(new Map<string, Gps | null>())

  useEffect(() => {
    if (!fileValue || !(fileValue instanceof File)) return

    const identity = fileIdentity(fileValue)
    const cached = gpsByIdentity.current.get(identity)

    if (cached !== undefined) {
      if (cached) {
        setLatitude(cached.latitude)
        setLongitude(cached.longitude)
      }
      return
    }

    let cancelled = false

    import('exifr').then(async (exifr) => {
      let gps: Gps | null = null
      try {
        const result = await exifr.gps(fileValue)
        if (result) gps = { latitude: result.latitude, longitude: result.longitude }
      } catch {
        // No EXIF/GPS data present, or unreadable format.
      }

      if (cancelled) return
      gpsByIdentity.current.set(identity, gps)

      if (gps) {
        setLatitude(gps.latitude)
        setLongitude(gps.longitude)
      }
    })

    return () => {
      cancelled = true
    }
  }, [fileValue, setLatitude, setLongitude])

  return <NumberField {...props} />
}
