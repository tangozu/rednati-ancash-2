import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter, Youtube } from 'lucide-react'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Footer as FooterType } from '@/payload-types'
import RichText from '@/components/RichText'

const socialIcons = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
} as const

const labelClassName = `
  mb-2.5
  font-mono
  text-xs
  text-earth
  tracking-[0.28em]
  uppercase
`

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as FooterType

  const {
    alliesLabel,
    contactLabel,
    contactEmail,
    contactPhone,
    socialLinks,
    supportLabel,
    aboutTextV2,
    copyrightText,
    creditsText,
    contactWhatsappLink,
    rednatiLogo,
    creditImages: rawCreditImages,
  } = footerData || {}

  const creditImages = (rawCreditImages || [])
    .map((item) => {
      const media = typeof item.image === 'object' ? item.image : null
      if (!media) return null

      return {
        url: getMediaUrl(media.url, media.updatedAt),
        alt: media.alt || 'Institución colaboradora',
        href: media.enableLink && media.linkUrl ? media.linkUrl : null,
      }
    })
    .filter((image): image is { url: string; alt: string; href: string | null } =>
      Boolean(image?.url),
    )

  const rednatiLogoMedia = typeof rednatiLogo === 'object' ? rednatiLogo : null
  const rednatiLogoHref =
    rednatiLogoMedia?.enableLink && rednatiLogoMedia?.linkUrl ? rednatiLogoMedia.linkUrl : null

  const rednatiLogoImg = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={rednatiLogoMedia ? getMediaUrl(rednatiLogoMedia.url, rednatiLogoMedia.updatedAt) : ''}
      alt="RedNatí Perú"
      className="h-16 w-auto object-contain md:h-20"
    />
  )

  return (
    <footer
      className="
        bg-bg
        border-t
        border-white/5
        py-8
        md:py-10
        px-6
        md:px-16
        xl:px-24
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* Fila 1: Nuestros Aliados / Contacto */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            gap-x-14
            gap-y-4
            pb-2
          "
        >
          <div>
            <span className={labelClassName}>{alliesLabel}</span>

            {rednatiLogoHref ? (
              <a href={rednatiLogoHref} target="_blank" rel="noopener noreferrer">
                {rednatiLogoImg}
              </a>
            ) : (
              rednatiLogoImg
            )}
          </div>

          <div>
            <span className={labelClassName}>{contactLabel}</span>

            {/* Contacto (horizontal) */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {contactEmail && (
                <a
                  href={`mailto:${contactEmail}`}
                  className="
                    flex
                    items-center
                    gap-2
                    font-mono
                    text-xs
                    text-cream
                    tracking-[0.15em]
                    hover:text-cream/60
                    transition-colors
                  "
                >
                  <Mail size={12} />
                  {contactEmail}
                </a>
              )}
              {contactPhone && (
                <a
                  href={contactWhatsappLink || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    items-center
                    gap-2
                    font-mono
                    text-xs
                    text-cream
                    tracking-[0.15em]
                    hover:text-cream/60
                    transition-colors
                  "
                >
                  <Phone size={12} />
                  {contactPhone}
                </a>
              )}

              <div className="flex items-center gap-2.5">
                {socialLinks?.map(({ platform, href, id }) => {
                  const Icon = socialIcons[platform]
                  if (!Icon) return null

                  return (
                    <a
                      key={id || platform}
                      href={href}
                      aria-label={platform}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream hover:text-cream/60 transition-colors"
                    >
                      <Icon size={15} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Fila 2: Con el Apoyo de / Sobre Nosotros */}
        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-start
            gap-x-14
            gap-y-4
            pt-2
            pb-6
            border-t
            border-b
            border-cream/5
          "
        >
          {/* Con el Apoyo de */}
          {creditImages.length > 0 && (
            <div className="shrink-0 md:max-w-xs">
              <span className={labelClassName}>{supportLabel}</span>

              <div className="flex flex-wrap items-center gap-3">
                {creditImages.map((image) => {
                  const imgClassName =
                    'h-12 w-auto object-contain opacity-80 transition-opacity hover:opacity-100'

                  if (!image.href) {
                    return (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={image.url}
                        src={image.url}
                        alt={image.alt}
                        className={imgClassName}
                      />
                    )
                  }

                  return (
                    <a key={image.url} href={image.href} target="_blank" rel="noopener noreferrer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={image.url} alt={image.alt} className={imgClassName} />
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          {/* Sobre Nosotros (sin subtítulo, solo contenido — alineado a la altura de las imágenes) */}
          {aboutTextV2 && (
            <RichText
              data={aboutTextV2}
              enableProse={false}
              enableGutter={false}
              className="
                flex-1
                min-w-0
                font-body
                text-xs
                text-earth-accent
                tracking-[0.08em]
                leading-relaxed
                md:mt-6.5
                text-justify
              "
            />
          )}
        </div>

        {/* Derechos */}
        <div
          className="
            pt-5
            flex
            flex-col
            md:flex-row
            items-start
            md:items-center
            justify-between
            gap-x-14
            gap-y-4
          "
        >
          <span
            className="
              font-mono
              text-xs
              text-cream
              tracking-[0.18em]
            "
          >
            {creditsText}
          </span>
          <span
            className="
              font-mono
              text-xs
              text-cream
              tracking-[0.18em]
            "
          >
            {copyrightText}
          </span>
        </div>
      </div>
    </footer>
  )
}
