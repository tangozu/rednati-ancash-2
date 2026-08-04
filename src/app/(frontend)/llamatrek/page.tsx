'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

// ─── Image map ───────────────────────────────────────────────────────────────
const IMG = {
  hero: 'https://images.unsplash.com/photo-1761831965382-e2d0c34663e2?w=1920&h=1080&fit=crop&auto=format',
  trek: 'https://images.unsplash.com/photo-1603820629413-490cd9c98cd6?w=900&h=1200&fit=crop&auto=format',
  llama: 'https://images.unsplash.com/photo-1578362646678-a1b282e43ff8?w=900&h=1200&fit=crop&auto=format',
  mountains: 'https://images.unsplash.com/photo-1568805711729-f0cde40b5b9d?w=1400&h=900&fit=crop&auto=format',
  snowPeak: 'https://images.unsplash.com/photo-1765574783141-2d0a070a7925?w=1200&h=800&fit=crop&auto=format',
  rainbow: 'https://images.unsplash.com/photo-1744295816404-4c73fd69e0f2?w=800&h=1200&fit=crop&auto=format',
  llama2: 'https://images.unsplash.com/photo-1526308422422-6a57b9567eff?w=900&h=1200&fit=crop&auto=format',
  chavin: 'https://images.unsplash.com/photo-1662387804511-31e3078b24e2?w=1400&h=900&fit=crop&auto=format',
  valley: 'https://images.unsplash.com/photo-1771261784551-a2bd37babbc3?w=1200&h=900&fit=crop&auto=format',
  wall: 'https://images.unsplash.com/photo-1525987112488-57890dee55a8?w=900&h=600&fit=crop&auto=format',
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar({ scrolled }: { scrolled: boolean }) {
  return (
    <nav
      aria-label="Navegación principal"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-xl border-b border-white/[0.05]'
          : ''
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 xl:px-16 flex items-center justify-between h-16 md:h-20">
        <a href="#inicio" className="font-display text-cream text-xl font-black tracking-tight leading-none">
          LT
        </a>
        <span className="font-mono text-[10px] text-cream/35 tracking-[0.4em] uppercase hidden md:block select-none">
          Llamatrek · Olleros → Chavín
        </span>
        <a
          href="https://wa.me/51958848684"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] text-earth tracking-[0.25em] uppercase hover:text-cream transition-colors duration-400 focus-visible:outline-none focus-visible:underline"
        >
          Reservar
        </a>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(imgRef.current, {
        scale: 1.1,
        duration: 2.8,
        ease: 'power2.out',
      })
        .from(
          metaRef.current,
          { opacity: 0, y: 16, duration: 1 },
          '-=1.8',
        )
        .from(
          titleRef.current,
          { opacity: 0, y: 70, duration: 1.5, ease: 'power4.out' },
          '-=1.4',
        )
        .from(
          subRef.current,
          { opacity: 0, y: 24, duration: 1 },
          '-=0.8',
        )
        .from(
          scrollRef.current,
          { opacity: 0, duration: 1 },
          '-=0.4',
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
      aria-label="Inicio LlamaTrek"
    >
      {/* Background image */}
      <div ref={imgRef} className="absolute inset-0 w-full h-full bg-stone">
        <img
          src={IMG.hero}
          alt="Cordillera Blanca, Ancash, Perú"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-bg/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-16 xl:px-24">
        <div ref={metaRef} className="flex items-center gap-4 mb-7">
          <span className="font-mono text-[10px] text-earth tracking-[0.38em] uppercase">
            REDNATI Perú
          </span>
          <span className="w-10 h-px bg-earth/50" />
          <span className="font-mono text-[10px] text-cream/45 tracking-[0.28em] uppercase">
            Ancash · 4,700 msnm
          </span>
        </div>

        <h1
          ref={titleRef}
          className="font-display text-cream font-black leading-[0.88] tracking-tight"
          style={{ fontSize: 'clamp(5rem, 14vw, 11.5rem)' }}
        >
          LLAMA
          <br />
          TREK
        </h1>

        <div ref={subRef} className="mt-8 max-w-sm md:max-w-md">
          <p className="font-body text-cream/65 text-base md:text-lg leading-relaxed">
            Una ruta ancestral. Tres días entre los Andes. Olleros hacia Chavín
            de Huántar con llamas como aliadas ecológicas.
          </p>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollRef} className="mt-12 flex items-center gap-3.5">
          <div className="relative w-px h-14 bg-cream/15 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-full bg-earth animate-scroll-line" />
          </div>
          <span className="font-mono text-[10px] text-cream/35 tracking-[0.35em] uppercase">
            Scroll
          </span>
        </div>
      </div>

      {/* Coordinates bottom-right */}
      <div className="absolute bottom-8 right-6 md:right-12 hidden md:flex flex-col items-end gap-1.5">
        <span className="font-mono text-[9px] text-cream/20 tracking-[0.2em]">
          9°35&apos;S 77°10&apos;W
        </span>
        <span className="font-mono text-[9px] text-cream/20 tracking-[0.2em]">
          Ancash · Perú
        </span>
      </div>
    </section>
  )
}

// ─── Manifiesto ───────────────────────────────────────────────────────────────
function ManifiestoSection() {
  return (
    <section className="bg-bg py-32 md:py-52 px-6 md:px-16 xl:px-32">
      <div className="max-w-screen-lg mx-auto">
        <div className="reveal mb-14">
          <span className="font-mono text-[10px] text-earth tracking-[0.4em] uppercase">
            01 — Manifiesto
          </span>
        </div>

        <blockquote className="reveal">
          <p
            className="font-display text-cream font-light italic leading-[1.08]"
            style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.8rem)' }}
          >
            "Hay caminos que no son rutas turísticas.
            <br className="hidden md:block" /> Son memorias vivas. Pasos que
            generaciones recorrieron
            <br className="hidden md:block" /> antes que nosotros, y que hoy
            compartimos
            <br className="hidden md:block" /> como acto de resistencia
            cultural."
          </p>
        </blockquote>

        <div className="mt-16 h-px bg-cream/[0.08] reveal" />

        <div className="mt-8 flex flex-wrap items-center gap-4 md:gap-8 reveal">
          <span className="font-mono text-[10px] text-cream/30 tracking-[0.28em] uppercase">
            REDNATI Perú
          </span>
          <span className="w-1 h-1 rounded-full bg-cream/15" />
          <span className="font-mono text-[10px] text-cream/20 tracking-[0.22em] uppercase">
            Buen Vivir · Turismo Indígena · Regenerativo
          </span>
        </div>
      </div>
    </section>
  )
}

// ─── La Ruta ──────────────────────────────────────────────────────────────────
function LaRutaSection() {
  return (
    <section className="bg-bg py-16 md:py-0 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-16 xl:px-24 mb-16 md:mb-0">
        <div className="reveal pt-4 md:pt-20">
          <span className="font-mono text-[10px] text-earth tracking-[0.4em] uppercase">
            02 — La Ruta
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
        {/* Image column */}
        <div className="clip-reveal overflow-hidden aspect-[3/4] md:aspect-auto md:min-h-[700px] bg-stone order-1">
          <img
            src={IMG.trek}
            alt="Expedicionista en la Cordillera Blanca, Ancash, Perú"
            className="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-[3s] ease-out"
            loading="lazy"
          />
        </div>

        {/* Text column */}
        <div className="flex flex-col justify-center px-6 md:px-14 xl:px-20 py-16 md:py-24 order-2">
          <h2
            className="reveal font-display text-cream font-bold leading-[1.05] mb-8"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
          >
            Olleros hacia Chavín de Huántar
          </h2>

          <p className="reveal font-body text-cream/55 text-base md:text-lg leading-relaxed mb-6">
            Un sendero pre-inca de tres días a través de la Cordillera Blanca de
            Ancash. El camino asciende desde el poblado de Olleros cruzando
            pasos cordilleranos a 4,700 metros sobre el nivel del mar.
          </p>

          <p className="reveal font-body text-cream/55 text-base md:text-lg leading-relaxed mb-14">
            Al final del recorrido aguarda el Centro Ceremonial de Chavín de
            Huántar —Patrimonio de la Humanidad UNESCO desde 1985—, testimonio
            de una civilización que moldeó el mundo andino tres mil años atrás.
          </p>

          <div className="stagger-parent grid grid-cols-3 gap-6">
            {[
              { num: '3', label: 'Días' },
              { num: '4,700', label: 'msnm' },
              { num: 'UNESCO', label: '1985' },
            ].map(({ num, label }) => (
              <div key={label} className="border-t border-cream/10 pt-6">
                <span className="font-display text-earth font-bold block mb-2" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}>
                  {num}
                </span>
                <span className="font-mono text-[10px] text-cream/35 tracking-[0.22em] uppercase block">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Filosofía ────────────────────────────────────────────────────────────────
function FilosofiaSection() {
  return (
    <section className="relative bg-bg py-32 md:py-52 overflow-hidden">
      {/* Faint background image */}
      <div className="absolute inset-0">
        <img
          src={IMG.mountains}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-[0.12]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/60 to-bg/90" />
      </div>

      <div className="relative max-w-screen-lg mx-auto px-6 md:px-16 xl:px-24">
        <div className="reveal mb-14">
          <span className="font-mono text-[10px] text-earth tracking-[0.4em] uppercase">
            03 — Filosofía
          </span>
        </div>

        <h2
          className="reveal font-display text-cream font-bold leading-[1.05] mb-20 max-w-3xl"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
        >
          El Buen Vivir como principio de cada paso
        </h2>

        <div className="stagger-parent grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          {[
            {
              title: 'Aliadas Ecológicas',
              body: 'Las llamas no son un atractivo. Son compañeras de camino y guardianas del ecosistema andino —símbolo vivo de una relación milenaria entre el ser humano y la naturaleza.',
            },
            {
              title: 'Espiritualidad Andina',
              body: 'Cada paso en este camino es un acto de comunicación con la Pachamama. La ruta Olleros–Chavín es un territorio sagrado donde el tiempo se mide en estrellas y nieves eternas.',
            },
            {
              title: 'Comunidad Viva',
              body: 'La Asociación de Auxiliares de Montaña Olleros–Chavín guía cada expedición sin intermediarios. Cada inversión retorna directamente a las familias que custodian este camino.',
            },
          ].map(({ title, body }) => (
            <div key={title} className="border-t border-cream/[0.09] pt-8">
              <h3 className="font-display text-cream text-xl md:text-2xl font-semibold mb-5">
                {title}
              </h3>
              <p className="font-body text-cream/50 text-sm md:text-base leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── La Expedición ────────────────────────────────────────────────────────────
function ExpedicionSection() {
  const days = [
    {
      num: '01',
      title: 'Ascenso desde Olleros',
      altitude: '2,800 → 4,100 msnm',
      hours: '5–6 horas',
      desc: 'Partida desde el pueblo de Olleros, remontando el cañón del río Yanayacu entre pajonales y queñuales. Las llamas marcan el ritmo del camino. Primera noche en Campo Shongo, bajo un cielo sin contaminación lumínica.',
      img: IMG.llama,
    },
    {
      num: '02',
      title: 'El Paso de los Andes',
      altitude: '4,100 → 4,700 → 3,800 msnm',
      hours: '7–8 horas',
      desc: 'La jornada más exigente y más intensa. El paso Yanashallash a 4,700 msnm ofrece vistas que detienen la respiración. Al descender, lagunas glaciales de agua turquesa reflejan los nevados de la Cordillera Blanca.',
      img: IMG.snowPeak,
    },
    {
      num: '03',
      title: 'Llegada a Chavín',
      altitude: '3,800 → 3,177 msnm',
      hours: '4–5 horas · UNESCO',
      desc: 'Descenso final hacia el Valle del Mosna. El Centro Ceremonial de Chavín de Huántar aparece entre los cerros como una revelación. Visita guiada al sitio Patrimonio de la Humanidad que floreció entre 900 y 200 a.C.',
      img: IMG.chavin,
    },
  ]

  return (
    <section className="bg-bg py-24 md:py-40">
      <div className="max-w-screen-xl mx-auto px-6 md:px-16 xl:px-24">
        <div className="reveal mb-14">
          <span className="font-mono text-[10px] text-earth tracking-[0.4em] uppercase">
            04 — La Expedición
          </span>
        </div>
        <h2
          className="reveal font-display text-cream font-bold leading-[1.05] mb-20 max-w-2xl"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
        >
          Tres días. Una transformación.
        </h2>

        <div className="divide-y divide-cream/[0.07]">
          {days.map((day, i) => (
            <div
              key={day.num}
              className="reveal grid grid-cols-1 md:grid-cols-2 gap-0 py-0"
            >
              {/* Text */}
              <div
                className={`py-12 md:py-16 ${
                  i % 2 === 1 ? 'md:order-2 md:pl-16 xl:pl-24' : 'md:pr-16 xl:pr-24'
                }`}
              >
                <div className="flex items-center gap-5 mb-7">
                  <span className="font-mono text-[10px] text-earth tracking-[0.35em]">
                    {day.num}
                  </span>
                  <span className="w-8 h-px bg-cream/15" />
                  <span className="font-mono text-[10px] text-cream/30 tracking-[0.22em] uppercase">
                    {day.hours}
                  </span>
                </div>

                <h3
                  className="font-display text-cream font-bold mb-2"
                  style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)' }}
                >
                  {day.title}
                </h3>
                <p className="font-mono text-[10px] text-earth/75 tracking-[0.22em] uppercase mb-7">
                  {day.altitude}
                </p>
                <p className="font-body text-cream/50 text-sm md:text-base leading-relaxed">
                  {day.desc}
                </p>
              </div>

              {/* Image */}
              <div
                className={`clip-reveal overflow-hidden aspect-video md:aspect-auto md:h-80 bg-stone ${
                  i % 2 === 1 ? 'md:order-1' : ''
                }`}
              >
                <img
                  src={day.img}
                  alt={day.title}
                  className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-[2.5s] ease-out"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Galería ──────────────────────────────────────────────────────────────────
function GaleriaSection() {
  const gallery = [
    { src: IMG.mountains, alt: 'Montañas andinas de Ancash, Perú', cls: 'md:col-span-2 md:row-span-1' },
    { src: IMG.llama2, alt: 'Llama en los Andes peruanos', cls: 'md:col-span-1 md:row-span-2' },
    { src: IMG.rainbow, alt: 'Montaña de colores, Perú', cls: 'md:col-span-1 md:row-span-1' },
    { src: IMG.valley, alt: 'Valle cordillerano, Ancash', cls: 'md:col-span-1 md:row-span-1' },
    { src: IMG.wall, alt: 'Texturas de piedra andina', cls: 'md:col-span-1 md:row-span-1' },
  ]

  return (
    <section className="bg-bg py-24 md:py-40 px-4 md:px-10 xl:px-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="reveal mb-12 px-2 md:px-0">
          <span className="font-mono text-[10px] text-earth tracking-[0.4em] uppercase">
            05 — Galería
          </span>
        </div>

        {/* Desktop masonry grid */}
        <div
          className="hidden md:grid gap-2"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(2, 300px)' }}
        >
          {gallery.map((img, i) => (
            <div key={i} className={`clip-reveal overflow-hidden bg-stone ${img.cls}`}>
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-[2.5s] ease-out"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Mobile stacked */}
        <div className="md:hidden space-y-2">
          {gallery.slice(0, 4).map((img, i) => (
            <div key={i} className="clip-reveal overflow-hidden aspect-video bg-stone">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── El Destino ───────────────────────────────────────────────────────────────
function ElDestinoSection() {
  return (
    <section className="bg-bg py-24 md:py-40 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-16 xl:px-24">
        <div className="reveal mb-14">
          <span className="font-mono text-[10px] text-earth tracking-[0.4em] uppercase">
            06 — El Destino
          </span>
        </div>
      </div>

      {/* Full-bleed image */}
      <div className="clip-reveal overflow-hidden h-56 sm:h-80 md:h-[440px] mb-16 md:mb-24 bg-stone">
        <img
          src={IMG.chavin}
          alt="Centro Ceremonial de Chavín de Huántar — Patrimonio UNESCO"
          className="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-[3s] ease-out"
          loading="lazy"
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          <div>
            <h2
              className="reveal font-display text-cream font-bold leading-[1.05] mb-5"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
            >
              Chavín de Huántar
            </h2>
            <p className="reveal font-mono text-[10px] text-earth tracking-[0.28em] uppercase leading-loose">
              Patrimonio de la Humanidad UNESCO · Desde 1985
              <br />
              Sierra oriental de Ancash · 3,177 msnm
            </p>
          </div>

          <div>
            <p className="reveal font-body text-cream/55 text-base md:text-lg leading-relaxed mb-6">
              El destino final de LlamaTrek es uno de los sitios arqueológicos
              más importantes del continente. Centro ceremonial de una
              civilización preinca que floreció entre 900 y 200 a.C., Chavín
              fue el primer gran horizonte cultural pan-andino.
            </p>
            <p className="reveal font-body text-cream/55 text-base md:text-lg leading-relaxed">
              Sus galerías subterráneas, el monolito Lanzón y sus estelas
              revelan un sistema de conocimiento astronómico, ritual y social
              extraordinariamente sofisticado. Llegar aquí caminando, como lo
              hacían los peregrinos, es la manera más auténtica de comprender
              su dimensión sagrada.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Contacto / CTA ───────────────────────────────────────────────────────────
function ContactoSection() {
  return (
    <section className="relative bg-panel py-32 md:py-52 overflow-hidden">
      {/* Faint background */}
      <div className="absolute inset-0">
        <img
          src={IMG.llama}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-[0.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-panel/70 via-transparent to-panel/80" />
      </div>

      <div className="relative max-w-screen-md mx-auto px-6 md:px-16 text-center">
        <div className="reveal mb-8">
          <span className="font-mono text-[10px] text-earth tracking-[0.4em] uppercase">
            Iniciar la expedición
          </span>
        </div>

        <h2
          className="reveal font-display text-cream font-black leading-[0.92] mb-10"
          style={{ fontSize: 'clamp(3.2rem, 9vw, 7.5rem)' }}
        >
          ¿Listo para caminar?
        </h2>

        <p className="reveal font-body text-cream/50 text-base md:text-lg leading-relaxed mb-6 max-w-sm mx-auto">
          Contacta directamente con la Asociación de Auxiliares de Montaña
          Olleros–Chavín.
        </p>
        <p className="reveal font-mono text-[10px] text-cream/35 tracking-[0.25em] uppercase mb-14">
          Guía: Jorge Martel Alvarado
        </p>

        <div className="stagger-parent flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/51958848684"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-earth text-bg font-body font-medium px-8 py-4 text-sm tracking-wide hover:bg-earth/85 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-earth"
          >
            WhatsApp +51 958 848 684
          </a>
          <a
            href="mailto:jorge.martel59@gmail.com"
            className="inline-flex items-center gap-3 border border-cream/15 text-cream/75 font-body px-8 py-4 text-sm tracking-wide hover:border-cream/40 hover:text-cream hover:bg-cream/[0.04] transition-all duration-300"
          >
            jorge.martel59@gmail.com
          </a>
        </div>

        <div className="reveal mt-16 pt-8 border-t border-cream/[0.07]">
          <p className="font-mono text-[9px] text-cream/25 tracking-[0.22em] uppercase leading-loose">
            Pasaje Agustín Loli Nº 463 · Plazuela de la Soledad
            <br />
            Huaraz, Ancash, Perú
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-bg border-t border-white/[0.05] py-12 md:py-16 px-6 md:px-16 xl:px-24">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-12 border-b border-cream/[0.05]">
          <div>
            <span className="font-display text-cream text-2xl font-black tracking-tight block mb-3">
              LlamaTrek
            </span>
            <span className="font-mono text-[9px] text-cream/25 tracking-[0.22em] uppercase leading-loose block">
              REDNATI Perú
              <br />
              Turismo Indígena Regenerativo
            </span>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[9px] text-earth/60 tracking-[0.28em] uppercase block mb-4">
              Contacto
            </span>
            <a
              href="mailto:contacto@rednatiperu.com"
              className="font-mono text-[10px] text-cream/30 tracking-[0.15em] block hover:text-cream/60 transition-colors duration-300"
            >
              contacto@rednatiperu.com
            </a>
            <a
              href="https://wa.me/51958848684"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-cream/30 tracking-[0.15em] block hover:text-cream/60 transition-colors duration-300"
            >
              +51 958 848 684
            </a>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[9px] text-earth/60 tracking-[0.28em] uppercase block mb-4">
              Con apoyo de
            </span>
            <span className="font-mono text-[10px] text-cream/25 tracking-[0.15em] block">
              CETSUR · Sueño Andino
            </span>
            <span className="font-mono text-[10px] text-cream/25 tracking-[0.15em] block">
              AGCID Chile · UNDP
            </span>
            <span className="font-mono text-[9px] text-cream/15 tracking-[0.12em] block pt-1">
              Proyecto Buen Vivir Chile–Perú 2025–2026
            </span>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="font-mono text-[9px] text-cream/15 tracking-[0.18em]">
            © 2025 REDNATI Perú · Todos los derechos reservados
          </span>
          <span className="font-mono text-[9px] text-cream/12 tracking-[0.18em] uppercase">
            Olleros → Chavín de Huántar · Ancash · Perú
          </span>
        </div>
      </div>
    </footer>
  )
}

// ─── App (root) ───────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onScroll = () => setScrolled(window.scrollY > 70)
    window.addEventListener('scroll', onScroll, { passive: true })

    if (reduced) {
      // Still show everything without animation
      document.querySelectorAll<HTMLElement>('.reveal, .clip-reveal').forEach((el) => {
        el.style.opacity = '1'
      })
      return () => window.removeEventListener('scroll', onScroll)
    }

    // ── Lenis smooth scroll ──────────────────────────────────────────────────
    const lenis = new Lenis({})
    lenis.on('scroll', ScrollTrigger.update)

    const rafFn = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(rafFn)
    gsap.ticker.lagSmoothing(0)

    // ── Scroll animations ────────────────────────────────────────────────────
    const ctx = gsap.context(() => {
      // Fade-up text reveals
      gsap.utils.toArray<Element>('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 55,
          opacity: 0,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
        })
      })

      // Clip-path image reveals (curtain from bottom)
      gsap.utils.toArray<Element>('.clip-reveal').forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.7,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        })
      })

      // Staggered children
      gsap.utils.toArray<Element>('.stagger-parent').forEach((parent) => {
        gsap.from(Array.from(parent.children), {
          y: 45,
          opacity: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: parent,
            start: 'top 85%',
            once: true,
          },
        })
      })
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      lenis.destroy()
      gsap.ticker.remove(rafFn)
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div className="bg-bg min-h-screen font-body">
      <Navbar scrolled={scrolled} />
      <HeroSection />
      <ManifiestoSection />
      <LaRutaSection />
      <FilosofiaSection />
      <ExpedicionSection />
      <GaleriaSection />
      <ElDestinoSection />
      <ContactoSection />
      <Footer />
    </div>
  )
}
