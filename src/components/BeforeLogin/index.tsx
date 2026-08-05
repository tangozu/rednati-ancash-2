import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { getMediaUrl } from '@/utilities/getMediaUrl'

import { ParallaxLoginImages } from './ParallaxLoginImages'

const getRandomLoginImages = async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'media',
    where: {
      mimeType: { contains: 'image' },
      imageType: { equals: 'gallery' },
    },
    limit: 50,
    depth: 0,
  })

  return [...docs]
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)
    .map((doc) => ({
      url: getMediaUrl(doc.url, doc.updatedAt),
      alt: doc.alt || 'LlamaTrek · RedNatí',
    }))
    .filter((image) => image.url)
}

const BeforeLogin: React.FC = async () => {
  const images = await getRandomLoginImages()

  return (
    <div>
      {images.length > 0 && <ParallaxLoginImages images={images} />}
      <p>
        <b>Welcome to your dashboard!</b>
        {' This is where site admins will log in to manage your website.'}
      </p>
    </div>
  )
}

export default BeforeLogin
