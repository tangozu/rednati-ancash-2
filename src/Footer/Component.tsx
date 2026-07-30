import Link from 'next/link'
import React from 'react'

import { Logo } from '@/components/Logo/Logo'

export async function Footer() {

  return (
    <footer
      className="
        bg-bg
        border-t
        border-white/[0.05]
        py-12
        md:py-16
        px-6
        md:px-16
        xl:px-24
      "
    >

      <div className="max-w-screen-xl mx-auto">

        {/* Top */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-12
            md:gap-8
            pb-12
            border-b
            border-cream/[0.05]
          "
        >

          {/* Marca */}
          <div>

            <Link href="/">
              <Logo />
            </Link>

            <span
              className="
                mt-3
                block
                font-mono
                text-[9px]
                text-cream/25
                tracking-[0.22em]
                uppercase
                leading-loose
              "
            >
              REDNATI Perú
              <br />
              Turismo Indígena Regenerativo
            </span>

          </div>


          {/* Contacto */}
          <div className="space-y-2">

            <span
              className="
                block
                mb-4
                font-mono
                text-[9px]
                text-earth/60
                tracking-[0.28em]
                uppercase
              "
            >
              Contacto
            </span>


            <a
              href="mailto:contacto@rednatiperu.com"
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
              contacto@rednatiperu.com
            </a>


            <a
              href="https://wa.me/51958848684"
              target="_blank"
              rel="noopener noreferrer"
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
              +51 958 848 684
            </a>

            <a className="
                block
                font-mono
                text-[10px]
                text-cream/30
                tracking-[0.15em]
                hover:text-cream/60
                transition-colors">
              By: Franco Panizo & Anthony Aguilar
            </a>

          </div>



          {/* Apoyo */}
          <div className="space-y-2">

            <span
              className="
                block
                mb-4
                font-mono
                text-[9px]
                text-earth/60
                tracking-[0.28em]
                uppercase
              "
            >
              Con apoyo de
            </span>


            <span
              className="
                block
                font-mono
                text-[10px]
                text-cream/25
                tracking-[0.15em]
              "
            >
              CETSUR · Sueño Andino
            </span>


            <span
              className="
                block
                font-mono
                text-[10px]
                text-cream/25
                tracking-[0.15em]
              "
            >
              AGCID Chile · UNDP
            </span>


            <span
              className="
                block
                pt-1
                font-mono
                text-[9px]
                text-cream/15
                tracking-[0.12em]
              "
            >
              Proyecto Buen Vivir Chile–Perú 2025–2026
            </span>


          </div>


        </div>



        {/* Bottom */}
        <div
          className="
            pt-8
            flex
            flex-col
            md:flex-row
            items-start
            md:items-center
            justify-between
            gap-4
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
              uppercase
            "
          >
            Olleros → Chavín de Huántar · Ancash · Perú
          </span>


        </div>


      </div>

    </footer>
  )
}