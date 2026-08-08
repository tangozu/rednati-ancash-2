import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter, Youtube } from 'lucide-react'

import { getMediaUrl } from '@/utilities/getMediaUrl'

const REDNATI_LOGO_URL = '/api/media/file/LOGO%20OK%20REDNATI%20PERU%20-%20EDITABLE-2.svg'

const socialLinks = [
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'YouTube', href: '#', Icon: Youtube },
  { label: 'Facebook', href: '#', Icon: Facebook },
  { label: 'Twitter', href: '#', Icon: Twitter },
  { label: 'LinkedIn', href: '#', Icon: Linkedin },
]

const labelClassName = `
  block
  mb-2.5
  font-mono
  text-[9px]
  text-earth
  tracking-[0.28em]
  uppercase
`

const getCreditImages = async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'media',
    where: {
      imageType: { equals: 'creditos' },
    },
    limit: 10,
    depth: 0,
    sort: 'alt',
  })

  return docs
    .map((doc) => ({
      url: getMediaUrl(doc.url, doc.updatedAt),
      alt: doc.alt || 'Institución colaboradora',
    }))
    .filter((image) => image.url)
}

export async function Footer() {
  const creditImages = await getCreditImages()

  return (
    <footer
      className="
        bg-bg
        border-t
        border-white/[0.05]
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
            grid
            grid-cols-[auto_auto]
            items-center
            gap-x-14
            gap-y-1
            pb-2
          "
        >
          <span className={`${labelClassName} !mb-0`}>Nuestros Aliados</span>
          <span className={`${labelClassName} !mb-0`}>Contacto</span>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={REDNATI_LOGO_URL}
            alt="RedNatí Perú"
            className="h-16 w-auto object-contain md:h-20"
          />

          {/* Contacto (horizontal) */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
            <a
              href="mailto:contacto@rednatiperu.com"
              className="
                flex
                items-center
                gap-2
                font-mono
                text-[10px]
                text-cream
                tracking-[0.15em]
                hover:text-cream/60
                transition-colors
              "
            >
              <Mail size={12} />
              contacto@rednatiperu.com
            </a>
            <a
              href="https://wa.me/51958848684"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                gap-2
                font-mono
                text-[10px]
                text-cream
                tracking-[0.15em]
                hover:text-cream/60
                transition-colors
              "
            >
              <Phone size={12} />
              +51 958 848 684
            </a>

            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream hover:text-cream/60 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Fila 2: Con el Apoyo de / Sobre Nosotros */}
        <div
          className="
            grid
            grid-cols-[auto_1fr]
            items-start
            gap-x-14
            gap-y-2.5
            pt-2
            pb-6
            border-t
            border-b
            border-cream/[0.05]
          "
        >
          {/* Con el Apoyo de */}
          {creditImages.length > 0 && (
            <>
              <span className={`${labelClassName} col-start-1 row-start-1`}>Con el Apoyo de</span>

              <div className="col-start-1 row-start-2 flex flex-wrap items-center gap-3">
                {creditImages.map((image) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={image.url}
                    src={image.url}
                    alt={image.alt}
                    className="h-8 w-auto object-contain opacity-80 transition-opacity hover:opacity-100"
                  />
                ))}
              </div>
            </>
          )}

          {/* Sobre Nosotros (sin subtítulo, solo contenido — alineado a la altura de las imágenes) */}
          <p
            className="
              col-start-2
              row-start-2
              max-w-7xl
              font-mono
              text-[9px]
              text-cream
              tracking-[0.08em]
              leading-relaxed
            "
          >
            Esta Landing Page fue confeccionada con el apoyo del proyecto de Cooperación
            Internacional Chile-Perú, año 2025-2026, &quot;El concepto del Buen Vivir:
            Compartiendo con organizaciones en Perú para emprender en turismo cultural bajo una
            mirada regenerativa&quot;, gracias a la iniciativa de cooperación internacional Fondo
            Chile, gestionada por el Ministerio de Relaciones Exteriores de Chile y la Agencia
            Chilena de Cooperación Internacional para el Desarrollo, AGCID, en conjunto con el
            Programa de las Naciones Unidas para el Desarrollo de Chile.
          </p>
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
            gap-2
          "
        >
          <span
            className="
              font-mono
              text-[9px]
              text-cream
              tracking-[0.18em]
            "
          >
            © 2025 REDNATI Perú · Todos los derechos reservados
          </span>

          <span
            className="
              font-mono
              text-[9px]
              text-cream
              tracking-[0.18em]
            "
          >
            By: Franco Panizo, Anthony Aguilar & Julissa
          </span>
        </div>
      </div>
    </footer>
  )
}
