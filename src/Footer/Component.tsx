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

const quickLinks = [
  { label: 'Aviso Legal', href: '#' },
  { label: 'Política de Privacidad', href: '#' },
  { label: 'Mapa del Sitio', href: '#' },
]

const labelClassName = `
  block
  mb-2.5
  font-mono
  text-[9px]
  text-earth/60
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
    limit: 50,
    depth: 0,
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
      <div className="max-w-screen-xl mx-auto">
        {/* Fila 1: Organización / Sobre Nosotros */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-[1fr_2fr]
            gap-6
            md:gap-10
            pb-6
          "
        >
          {/* Organización */}
          <div>
            <span className={labelClassName}>Organización</span>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={REDNATI_LOGO_URL}
              alt="RedNatí Perú"
              className="mb-2.5 h-16 w-auto object-contain md:h-20"
            />

            <span
              className="
                block
                font-mono
                text-[10px]
                text-cream/25
                tracking-[0.22em]
                uppercase
                leading-relaxed
              "
            >
              REDNATI Perú — Turismo Indígena Regenerativo
            </span>
          </div>

          {/* Sobre Nosotros */}
          <div>
            <span className={labelClassName}>Sobre Nosotros</span>

            <p
              className="
                max-w-2xl
                font-mono
                text-[9px]
                text-cream/25
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
        </div>

        {/* Fila 2: Contacto / Enlaces Rápidos / Con el Apoyo de */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-6
            md:gap-10
            py-6
            border-t
            border-b
            border-cream/[0.05]
          "
        >
          {/* Contacto */}
          <div>
            <span className={labelClassName}>Contacto</span>

            <div className="space-y-1.5">
              <a
                href="mailto:contacto@rednatiperu.com"
                className="
                  flex
                  items-center
                  gap-2
                  font-mono
                  text-[10px]
                  text-cream/30
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
                  text-cream/30
                  tracking-[0.15em]
                  hover:text-cream/60
                  transition-colors
                "
              >
                <Phone size={12} />
                +51 958 848 684
              </a>
            </div>

            <span
              className="
                mt-3
                mb-2
                block
                font-mono
                text-[9px]
                text-cream/25
                tracking-[0.22em]
                uppercase
              "
            >
              Social Links
            </span>

            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/30 hover:text-cream/60 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <span className={labelClassName}>Enlaces Rápidos</span>

            <div className="space-y-1.5">
              {quickLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="
                    block
                    font-mono
                    text-[10px]
                    text-cream/30
                    tracking-[0.15em]
                    hover:text-cream/60
                    transition-colors
                  "
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Con el Apoyo de */}
          {creditImages.length > 0 && (
            <div>
              <span className={labelClassName}>Con el Apoyo de</span>

              <div className="flex flex-wrap items-center gap-3">
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
            </div>
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
            gap-2
          "
        >
          <span
            className="
              font-mono
              text-[9px]
              text-cream/15
              tracking-[0.18em]
            "
          >
            © 2025 REDNATI Perú · Todos los derechos reservados
          </span>

          <span
            className="
              font-mono
              text-[9px]
              text-cream/15
              tracking-[0.18em]
            "
          >
            By: Franco Panizo & Anthony Aguilar
          </span>
        </div>
      </div>
    </footer>
  )
}
