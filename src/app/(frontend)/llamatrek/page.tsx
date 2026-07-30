'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

// ─── Image manifest ───────────────────────────────────────────────────────────
const I = {
  hero: 'https://images.unsplash.com/photo-1764380246149-65b67c7c5cf3?w=1920&h=1080&fit=crop&auto=format',
  fogMtn:
    'https://images.unsplash.com/photo-1603330421738-0a759263b5e7?w=1920&h=1200&fit=crop&auto=format',
  stone:
    'https://images.unsplash.com/photo-1772236743335-c3bd4db34f01?w=900&h=1200&fit=crop&auto=format',
  llamas:
    'https://images.unsplash.com/photo-1560262324-865100c6194c?w=900&h=600&fit=crop&auto=format',
  community:
    'https://images.unsplash.com/photo-1566793772361-1d5d9cefbd12?w=900&h=600&fit=crop&auto=format',
  textile:
    'https://images.unsplash.com/photo-1568805778719-c768512debe8?w=700&h=1050&fit=crop&auto=format',
  archway:
    'https://images.unsplash.com/photo-1772236746374-c37a7f49f579?w=700&h=1050&fit=crop&auto=format',
  alpacas:
    'https://images.unsplash.com/photo-1766946173076-41e5dc025c3c?w=1200&h=800&fit=crop&auto=format',
  womanHat:
    'https://images.unsplash.com/photo-1730423284218-a8a7e9422ebf?w=700&h=1050&fit=crop&auto=format',
  snowMtn:
    'https://images.unsplash.com/photo-1509273954142-d24fb1bb212d?w=1920&h=1080&fit=crop&auto=format',
  llamaGrass:
    'https://images.unsplash.com/photo-1764380245913-7067bc1d5c14?w=900&h=600&fit=crop&auto=format',
  coloredAlp:
    'https://images.unsplash.com/photo-1769102084667-d760c389e3df?w=700&h=1050&fit=crop&auto=format',
}

// ─── Nav links ────────────────────────────────────────────────────────────────
const NAV = [
  { label: 'Nosotros', id: 'nosotros' },
  { label: 'Expediciones', id: 'expediciones' },
  { label: 'Galería', id: 'galeria' },
  { label: 'Territorio', id: 'territorio' },
  { label: 'Contacto', id: 'contacto' },
]

// ─── Experiences ─────────────────────────────────────────────────────────────
const EXPERIENCES = [
  {
    num: '01',
    name: 'Ruta del Amanecer',
    sub: 'Media jornada · Fácil-Moderado',
    duration: '4–5 horas',
    alt: '2 800 msnm',
    desc: 'Inicia antes del amanecer. Camina los senderos ancestrales iluminados por la primera luz del Ande mientras las llamas marcan el ritmo. Al llegar a la cima, el valle se abre ante ti como una revelación.',
    img: I.llamaGrass,
    imgAlt: 'Llamas pastando en las alturas andinas al amanecer',
  },
  {
    num: '02',
    name: 'Camino de los Apus',
    sub: 'Jornada completa · Moderado',
    duration: '8–10 horas',
    alt: '3 200 msnm',
    desc: 'Un viaje de inmersión completa por los circuitos sagrados del territorio Chankayán. Visita comunidades, aprende técnicas ancestrales de pastoreo y comparte una mesa de alimentos tradicionales preparada por la comunidad.',
    img: I.stone,
    imgAlt: 'Estructura de piedra antigua en cima de montaña con niebla',
  },
  {
    num: '03',
    name: 'Expedición Chankayán',
    sub: 'Múltiples días · Moderado-Exigente',
    duration: '3 días / 2 noches',
    alt: '3 600 msnm',
    desc: 'La experiencia más profunda que ofrecemos. Tres días de expedición con la comunidad, durmiendo bajo las estrellas andinas, aprendiendo la lengua, los tejidos, la cosmovisión. Un viaje que no termina cuando regresas.',
    img: I.archway,
    imgAlt: 'Arco de piedra antigua enmarcando pico de montaña en la niebla',
  },
]

// ─── Gallery images ───────────────────────────────────────────────────────────
const GALLERY = [
  { src: I.alpacas, alt: 'Manada de alpacas en pastizales con montañas de fondo', tall: false },
  { src: I.textile, alt: 'Manos artesanas tejiendo con lana de colores andinos', tall: true },
  {
    src: I.community,
    alt: 'Mujeres de la comunidad sonriendo con atuendo tradicional',
    tall: false,
  },
  { src: I.womanHat, alt: 'Mujer con sombrero colorido andino en el campo', tall: true },
  { src: I.fogMtn, alt: 'Montañas andinas envueltas en neblina al amanecer', tall: false },
  { src: I.coloredAlp, alt: 'Alpaca blanca con decoración de lana de colores', tall: false },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      '"Caminar junto a las llamas por los senderos ancestrales fue una experiencia que cambió mi forma de ver el mundo. No visité el Ande. Lo sentí."',
    name: 'María L.',
    origin: 'Lima, Perú',
  },
  {
    quote:
      '"Los guías de la comunidad te hacen sentir parte de algo genuino. Hay una profundidad humana en cada gesto, en cada historia compartida."',
    name: 'James T.',
    origin: 'Vancouver, Canadá',
  },
  {
    quote:
      '"El Buen Vivir no es una filosofía abstracta. Lo viví en cada paso, en cada amanecer, en cada silencio compartido en las alturas."',
    name: 'Ana R.',
    origin: 'Barcelona, España',
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: '¿Qué nivel de condición física necesito?',
    a: 'Para la Ruta del Amanecer recomendamos una condición física básica. El Camino de los Apus requiere un nivel moderado. La Expedición Chankayán demanda resistencia y experiencia en altitud. Si tienes dudas, escríbenos y te orientamos.',
  },
  {
    q: '¿Cuál es la mejor época para visitar?',
    a: 'La temporada seca andina, entre mayo y octubre, ofrece los mejores días para la expedición: cielos despejados, senderos secos y visibilidad excepcional. En temporada húmeda (noviembre–abril), la niebla aporta un ambiente místico, aunque los senderos requieren mayor precaución.',
  },
  {
    q: '¿Qué incluye el paquete?',
    a: 'Todos los recorridos incluyen guía indígena certificado, llamas de carga, alimentación tradicional de la comunidad y equipamiento básico de seguridad. La Expedición Chankayán también incluye dos noches de campamento bajo las estrellas.',
  },
  {
    q: '¿Pueden participar niños y personas mayores?',
    a: 'La Ruta del Amanecer es apta para niños a partir de los 8 años acompañados de adultos. Contamos con adaptaciones para personas mayores y para quienes requieren asistencia especial. Consulta con nosotros antes de reservar.',
  },
  {
    q: '¿Cómo llego al punto de encuentro?',
    a: 'El punto de encuentro es la Plaza de Armas de Huaral, a 85 km al norte de Lima. Desde Lima puedes llegar en autobús (2 horas) o en auto. Podemos coordinar transporte desde Lima con coste adicional.',
  },
  {
    q: '¿Es un turismo sostenible?',
    a: 'LlamaTrek es un emprendimiento de turismo indígena regenerativo articulado por REDNATI Perú. El 100 % de los ingresos retorna a la comunidad Chankayán. Las llamas son animales de trabajo sanos y respetados. No dejamos huella negativa en el territorio.',
  },
]

// ─── Partners ─────────────────────────────────────────────────────────────────
const PARTNERS = [
  'REDNATI Perú',
  'PromPerú',
  'MINCETUR',
  'SERNANP',
  'Alianza Biocultura',
  'Municipalidad Huaral',
]

// ═════════════════════════════════════════════════════════════════════════════
export default function Page() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formSent, setFormSent] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const heroRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLDivElement>(null)
  const heroCopyRef = useRef<HTMLDivElement>(null)
  const faqRefs = useRef<(HTMLDivElement | null)[]>([])

  // ─── Smooth scroll (Lenis) ────────────────────────────────────────────────
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({ lerp: 0.075 })
    lenis.on('scroll', ScrollTrigger.update)

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  // ─── Navbar visibility ────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ─── GSAP animations ─────────────────────────────────────────────────────
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      // Hero image parallax
      gsap.to(heroImgRef.current, {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Hero copy entrance
      if (heroCopyRef.current) {
        const els = heroCopyRef.current.children
        gsap.fromTo(
          els,
          { opacity: 0, y: 48 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.18, delay: 0.4, ease: 'power3.out' },
        )
      }

      // Fade-up on scroll
      gsap.utils.toArray<Element>('.anim-up').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          },
        )
      })

      // Clip-path image reveals
      gsap.utils.toArray<Element>('.anim-img').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 100% 0 0)', scale: 1.06 },
          {
            clipPath: 'inset(0 0% 0 0)',
            scale: 1,
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
          },
        )
      })

      // Stagger grid
      gsap.utils.toArray<Element>('.stagger-wrap').forEach((wrap) => {
        const children = wrap.querySelectorAll('.stagger-item')
        gsap.fromTo(
          children,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: wrap,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        )
      })

      // Parallax background images
      gsap.utils.toArray<Element>('.bg-parallax').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })

      // Section divider lines
      gsap.utils.toArray<Element>('.line-grow').forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  // ─── FAQ accordion ────────────────────────────────────────────────────────
  useEffect(() => {
    faqRefs.current.forEach((el, i) => {
      if (!el) return
      const isOpen = faqOpen === i
      gsap.to(el, {
        height: isOpen ? el.scrollHeight : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.4,
        ease: 'power2.inOut',
      })
    })
  }, [faqOpen])

  // ─── Testimonial auto-advance ─────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSent(true)
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="grain bg-obsidian text-linen overflow-x-hidden">
      {/* ── NAVBAR ───────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          navScrolled || menuOpen
            ? 'bg-obsidian/95 backdrop-blur-lg py-4 border-b border-linen/5'
            : 'py-7'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('inicio')}
            className="flex flex-col leading-none cursor-pointer group"
            aria-label="Ir al inicio"
          >
            <span className="font-display text-[11px] tracking-[0.35em] uppercase text-earth">
              REDNATI Perú
            </span>
            <span className="font-display text-xl font-bold tracking-wide text-linen group-hover:text-earth transition-colors duration-300">
              LlamaTrek
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-[13px] tracking-[0.12em] uppercase text-fog/70 hover:text-linen transition-colors duration-300 cursor-pointer"
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contacto')}
              className="ml-4 px-5 py-2 border border-earth/60 text-earth text-[12px] tracking-[0.15em] uppercase hover:bg-earth hover:text-obsidian transition-all duration-300 cursor-pointer"
            >
              Reservar
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] cursor-pointer p-2"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px w-7 bg-linen transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}
            />
            <span
              className={`block h-px w-5 bg-linen transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-px w-7 bg-linen transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col px-6 pb-8 pt-6 gap-5" aria-label="Menú móvil">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-left font-display text-2xl italic font-light text-linen/80 hover:text-earth transition-colors duration-300 cursor-pointer"
              >
                {n.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contacto')}
              className="mt-2 self-start px-6 py-2.5 border border-earth/60 text-earth text-[12px] tracking-[0.15em] uppercase cursor-pointer"
            >
              Reservar
            </button>
          </nav>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        id="inicio"
        ref={heroRef}
        className="relative h-screen min-h-[640px] overflow-hidden"
      >
        {/* Background image */}
        <div ref={heroImgRef} className="absolute inset-0 scale-110 bg-stone">
          <img
            src={I.hero}
            alt="Llama en pastizales andinos con montañas al fondo"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 to-transparent" />

        {/* Cinematic bars */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-obsidian/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-obsidian to-transparent" />

        {/* Hero copy */}
        <div
          ref={heroCopyRef}
          className="relative z-10 h-full flex flex-col justify-end pb-20 lg:pb-28 px-6 lg:px-16 max-w-[1440px] mx-auto"
        >
          <p className="font-display text-[11px] md:text-xs tracking-[0.4em] uppercase text-earth mb-5 opacity-0">
            REDNATI Perú · Turismo Indígena Regenerativo
          </p>
          <h1 className="font-display font-bold text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] tracking-tight text-linen mb-6 opacity-0">
            Llama
            <br />
            <em className="not-italic text-transparent" style={{ WebkitTextStroke: '1px #f0ead8' }}>
              Trek
            </em>
          </h1>
          <p className="font-display italic font-light text-[clamp(1rem,2.5vw,1.5rem)] text-fog/80 max-w-xl leading-relaxed mb-10 opacity-0">
            Un viaje hacia el corazón del territorio ancestral Chankayán.
            <br />
            Donde la montaña enseña y la comunidad acoge.
          </p>
          <div className="flex items-center gap-6 opacity-0">
            <button
              onClick={() => scrollTo('expediciones')}
              className="px-7 py-3.5 bg-earth text-obsidian text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-amber transition-colors duration-300 cursor-pointer"
            >
              Iniciar expedición
            </button>
            <button
              onClick={() => scrollTo('nosotros')}
              className="text-[12px] tracking-[0.15em] uppercase text-linen/60 hover:text-linen transition-colors duration-300 cursor-pointer"
            >
              Descubrir →
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-6 lg:right-12 z-10 flex flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.3em] uppercase text-fog/40 rotate-90 origin-center mb-4">
            scroll
          </span>
          <div className="scroll-hint w-px h-12 bg-gradient-to-b from-transparent to-earth/60" />
        </div>
      </section>

      {/* ── MANIFIESTO / NOSOTROS ─────────────────────────────────────────── */}
      <section id="nosotros" className="relative bg-obsidian overflow-hidden py-32 lg:py-48">
        {/* Background image with extreme overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={I.fogMtn}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-8 bg-parallax"
            style={{ opacity: 0.08 }}
          />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16">
          {/* Chapter marker */}
          <div className="flex items-center gap-5 mb-16 anim-up">
            <span className="font-display text-[10px] tracking-[0.5em] uppercase text-earth">
              I
            </span>
            <div className="line-grow h-px w-20 bg-earth/40" />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-stone">
              Quiénes somos
            </span>
          </div>

          {/* Large editorial statement */}
          <blockquote className="font-display italic font-light text-[clamp(1.8rem,4.5vw,4rem)] text-linen/90 leading-[1.15] max-w-4xl mb-16 anim-up">
            "La llama no solo carga.
            <br />
            <span className="text-earth">Guía. Conecta. Enseña.</span>
            <br />
            Así también lo hace nuestra comunidad."
          </blockquote>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-6 anim-up">
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-linen">
                El emprendimiento
              </h2>
              <p className="text-fog/80 leading-relaxed text-base lg:text-lg">
                LlamaTrek nace de la comunidad indígena Chankayán, en las alturas del valle del río
                Chancay, Huaral, Lima. Es un proyecto de turismo indígena regenerativo articulado
                por
                <strong className="text-linen"> REDNATI Perú</strong>, la Red Nacional de Turismo
                Indígena del Perú.
              </p>
              <p className="text-fog/80 leading-relaxed text-base lg:text-lg">
                No somos una agencia de viajes. Somos una comunidad viva que abre sus caminos a
                quienes llegan con respeto. Cada expedición es una oportunidad de intercambio
                genuino: tú traes tu curiosidad, nosotros traemos nuestra historia.
              </p>
            </div>

            <div className="space-y-6 anim-up">
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-linen">
                El Buen Vivir
              </h2>
              <p className="text-fog/80 leading-relaxed text-base lg:text-lg">
                LlamaTrek se guía por el principio del <em className="text-earth">Buen Vivir</em>:
                la convicción andina de que el bienestar individual está inseparablemente ligado al
                bienestar de la comunidad y de la naturaleza. El 100 % de los ingresos retorna
                directamente a la comunidad Chankayán.
              </p>
              <p className="text-fog/80 leading-relaxed text-base lg:text-lg">
                Las llamas son compañeras de expedición, no objetos de atracción. Los guías son
                portadores de conocimiento ancestral, no actores de un performance turístico. El
                territorio es sagrado, no un escenario.
              </p>
            </div>
          </div>

          {/* Stat strip */}
          <div className="mt-20 pt-12 border-t border-linen/8 grid grid-cols-2 lg:grid-cols-4 gap-8 stagger-wrap">
            {[
              { num: '15+', label: 'Años de historia comunitaria' },
              { num: '40+', label: 'Familias Chankayán participantes' },
              { num: '3 600', label: 'msnm — cima de expedición' },
              { num: '100%', label: 'Ingresos retornan a la comunidad' },
            ].map((s) => (
              <div key={s.num} className="stagger-item">
                <p className="font-display font-bold text-4xl lg:text-5xl text-earth mb-2">
                  {s.num}
                </p>
                <p className="text-[13px] text-fog/60 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPEDICIONES ─────────────────────────────────────────────────── */}
      <section id="expediciones" className="bg-obsidian2 py-32 lg:py-48">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          {/* Chapter marker */}
          <div className="flex items-center gap-5 mb-16 anim-up">
            <span className="font-display text-[10px] tracking-[0.5em] uppercase text-earth">
              II
            </span>
            <div className="line-grow h-px w-20 bg-earth/40" />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-stone">
              Expediciones
            </span>
          </div>

          <h2 className="font-display font-bold text-[clamp(2.2rem,5vw,4.5rem)] text-linen leading-tight max-w-2xl mb-4 anim-up">
            Tres caminos.
            <br />
            <em className="italic font-light text-earth">Una misma tierra.</em>
          </h2>
          <p className="text-fog/70 max-w-xl text-lg mb-20 anim-up">
            Elige tu ritmo. Cada expedición es guiada por miembros de la comunidad Chankayán y
            acompañada por llamas que conocen el camino mejor que nadie.
          </p>

          {/* Experience cards */}
          <div className="space-y-2">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceRow key={exp.num} exp={exp} flipped={i % 2 !== 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERÍA ───────────────────────────────────────────────────────── */}
      <section id="galeria" className="bg-obsidian py-32 lg:py-48">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          {/* Chapter marker */}
          <div className="flex items-center gap-5 mb-16 anim-up">
            <span className="font-display text-[10px] tracking-[0.5em] uppercase text-earth">
              III
            </span>
            <div className="line-grow h-px w-20 bg-earth/40" />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-stone">
              Galería
            </span>
          </div>

          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,4rem)] text-linen mb-3 anim-up">
            El territorio en imágenes
          </h2>
          <p className="text-fog/70 text-lg mb-16 anim-up">
            Ninguna fotografía hace justicia a estar allí. Pero estas se acercan.
          </p>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3 stagger-wrap">
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className={`stagger-item overflow-hidden bg-surface relative group ${
                  img.tall ? 'row-span-2' : ''
                }`}
                style={{ aspectRatio: img.tall ? '2/3' : '4/3' }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-obsidian/0 group-hover:bg-obsidian/20 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TERRITORIO ────────────────────────────────────────────────────── */}
      <section id="territorio" className="bg-obsidian2 py-32 lg:py-48">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          {/* Chapter marker */}
          <div className="flex items-center gap-5 mb-16 anim-up">
            <span className="font-display text-[10px] tracking-[0.5em] uppercase text-earth">
              IV
            </span>
            <div className="line-grow h-px w-20 bg-earth/40" />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-stone">
              Territorio
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Text */}
            <div className="anim-up">
              <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-linen leading-tight mb-8">
                El territorio
                <br />
                <em className="italic font-light text-earth">Chankayán</em>
              </h2>
              <div className="space-y-5 text-fog/80 leading-relaxed">
                <p>
                  El territorio Chankayán se extiende en las faldas y alturas de la cordillera
                  Occidental, en la cuenca del río Chancay-Huaral, región Lima. Este espacio fue
                  habitado por la cultura Chancay antes de la llegada del Tahuantinsuyo, dejando un
                  patrimonio arqueológico y ecológico de enorme valor.
                </p>
                <p>
                  A más de 2 800 metros sobre el nivel del mar, los ecosistemas de jalca y puna
                  albergan una biodiversidad excepcional: aves endémicas, flora medicinal, lagunas
                  de altura y formaciones geológicas que los comuneros llaman{' '}
                  <em className="text-earth">Apus</em>, espíritus guardianes de la montaña.
                </p>
                <p>
                  La comunidad Chankayán mantiene viva su relación con este territorio a través de
                  prácticas agrícolas ancestrales, crianza de camélidos sudamericanos y ceremonias
                  de reciprocidad con la naturaleza.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8">
                {[
                  'Puna andina',
                  'Jalca',
                  'Lagunas de altura',
                  'Camélidos',
                  'Arqueología Chancay',
                  'Comunidad viva',
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 border border-stone/30 text-fog/60 text-[11px] tracking-[0.1em]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="anim-img">
              <div className="relative overflow-hidden bg-surface" style={{ aspectRatio: '4/3' }}>
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-77.6%2C-11.5%2C-76.7%2C-10.9&layer=mapnik"
                  title="Mapa del territorio Chankayán, Huaral, Lima"
                  className="w-full h-full border-0 opacity-80 grayscale contrast-125"
                  loading="lazy"
                />
                {/* Map overlay for tonal consistency */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(12,10,8,0.25) 0%, transparent 50%)',
                  }}
                />
              </div>
              <p className="text-[11px] text-stone/60 mt-2 tracking-wider">
                Valle del río Chancay-Huaral · Lima, Perú · ~85 km al norte de Lima
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── INFORMACIÓN PRÁCTICA ──────────────────────────────────────────── */}
      <section className="bg-obsidian py-32 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          {/* Chapter marker */}
          <div className="flex items-center gap-5 mb-16 anim-up">
            <span className="font-display text-[10px] tracking-[0.5em] uppercase text-earth">
              V
            </span>
            <div className="line-grow h-px w-20 bg-earth/40" />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-stone">
              Antes de partir
            </span>
          </div>

          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-linen mb-16 anim-up">
            Información práctica
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-wrap">
            {[
              {
                icon: '◯',
                title: 'Mejor temporada',
                lines: [
                  'Mayo – Octubre',
                  'Temporada seca',
                  'Cielos despejados',
                  'Senderos estables',
                ],
              },
              {
                icon: '△',
                title: 'Qué llevar',
                lines: [
                  'Ropa de abrigo en capas',
                  'Chaqueta impermeable',
                  'Protector solar FPS 50+',
                  'Sombrero de ala ancha',
                  'Agua (mínimo 2 L)',
                ],
              },
              {
                icon: '□',
                title: 'Incluido',
                lines: [
                  'Guía indígena certificado',
                  'Llamas de carga',
                  'Alimentación tradicional',
                  'Equipo básico de seguridad',
                ],
              },
              {
                icon: '☽',
                title: 'Punto de encuentro',
                lines: [
                  'Plaza de Armas',
                  'Huaral, Lima',
                  '85 km desde Lima',
                  '2 h en transporte público',
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                className="stagger-item border border-linen/8 p-8 hover:border-earth/30 transition-colors duration-500"
              >
                <p className="text-earth text-2xl mb-5">{card.icon}</p>
                <h3 className="font-display font-bold text-lg text-linen mb-4">{card.title}</h3>
                <ul className="space-y-1.5">
                  {card.lines.map((l) => (
                    <li key={l} className="text-[13px] text-fog/60 leading-relaxed">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULLBLEED image break ─────────────────────────────────────────── */}
      <div className="relative h-[50vh] min-h-[320px] overflow-hidden bg-stone">
        <img
          src={I.snowMtn}
          alt="Paisaje de montañas nevadas de los Andes peruanos"
          loading="lazy"
          className="w-full h-full object-cover object-center bg-parallax"
          style={{ transform: 'scale(1.2)', transformOrigin: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-obsidian/30 to-transparent" />
        <div className="absolute inset-0 flex items-center px-6 lg:px-16 max-w-[1440px] mx-auto">
          <p className="font-display italic font-light text-[clamp(1.4rem,4vw,3rem)] text-linen/90 max-w-2xl leading-tight anim-up">
            "El viajero que llega con respeto
            <br />
            no solo observa la montaña.
            <br />
            <em className="text-earth not-italic">Pasa a ser parte de ella.</em>"
          </p>
        </div>
      </div>

      {/* ── TESTIMONIOS ───────────────────────────────────────────────────── */}
      <section className="bg-obsidian2 py-32 lg:py-48">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          {/* Chapter marker */}
          <div className="flex items-center gap-5 mb-16 anim-up">
            <span className="font-display text-[10px] tracking-[0.5em] uppercase text-earth">
              VI
            </span>
            <div className="line-grow h-px w-20 bg-earth/40" />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-stone">
              Testimonios
            </span>
          </div>

          <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-linen mb-16 anim-up">
            Voces del camino
          </h2>

          {/* Testimonial carousel */}
          <div className="relative min-h-[260px]">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-700 ${
                  i === activeTestimonial
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <blockquote className="font-display italic font-light text-[clamp(1.3rem,3.5vw,2.8rem)] text-linen/90 leading-tight max-w-4xl mb-8">
                  {t.quote}
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-px bg-earth" />
                  <p className="text-[13px] text-fog/70">
                    <strong className="text-linen font-medium">{t.name}</strong>
                    {' · '}
                    {t.origin}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex gap-2 mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-px transition-all duration-300 cursor-pointer ${
                  i === activeTestimonial ? 'w-10 bg-earth' : 'w-4 bg-stone/40'
                }`}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="bg-obsidian py-32 lg:py-48">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          {/* Chapter marker */}
          <div className="flex items-center gap-5 mb-16 anim-up">
            <span className="font-display text-[10px] tracking-[0.5em] uppercase text-earth">
              VII
            </span>
            <div className="line-grow h-px w-20 bg-earth/40" />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-stone">
              Preguntas frecuentes
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div className="anim-up">
              <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-linen leading-tight">
                Todo lo que
                <br />
                necesitas saber
                <br />
                <em className="italic font-light text-earth">antes de partir.</em>
              </h2>
            </div>

            <div className="divide-y divide-linen/8 anim-up">
              {FAQS.map((faq, i) => (
                <div key={i} className="py-6">
                  <button
                    className="w-full flex items-start justify-between gap-4 text-left cursor-pointer group"
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    aria-expanded={faqOpen === i}
                  >
                    <span className="font-display font-medium text-base lg:text-lg text-linen group-hover:text-earth transition-colors duration-300">
                      {faq.q}
                    </span>
                    <span
                      className={`flex-shrink-0 mt-1 text-earth text-lg transition-transform duration-300 ${
                        faqOpen === i ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    ref={(el) => {
                      faqRefs.current[i] = el
                    }}
                    style={{ height: 0, overflow: 'hidden', opacity: 0 }}
                  >
                    <p className="text-fog/70 leading-relaxed pt-4 text-[15px]">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ──────────────────────────────────────────────────────── */}
      <section id="contacto" className="bg-obsidian2 py-32 lg:py-48">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          {/* Chapter marker */}
          <div className="flex items-center gap-5 mb-16 anim-up">
            <span className="font-display text-[10px] tracking-[0.5em] uppercase text-earth">
              VIII
            </span>
            <div className="line-grow h-px w-20 bg-earth/40" />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-stone">
              Contacto
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left */}
            <div className="anim-up">
              <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] text-linen leading-tight mb-6">
                Inicia tu
                <br />
                <em className="italic font-light text-earth">expedición.</em>
              </h2>
              <p className="text-fog/70 leading-relaxed text-lg mb-10 max-w-sm">
                Escríbenos para consultar disponibilidad, resolver dudas o simplemente saber más. La
                comunidad Chankayán te espera.
              </p>

              <div className="space-y-5">
                <a
                  href="https://wa.me/51960000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <span className="w-10 h-10 border border-sage/30 flex items-center justify-center text-sage text-lg group-hover:bg-sage group-hover:text-obsidian transition-all duration-300">
                    ◎
                  </span>
                  <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-stone mb-0.5">
                      WhatsApp
                    </p>
                    <p className="text-linen text-sm">+51 960 000 000</p>
                  </div>
                </a>
                <a href="mailto:info@rednatiperu.com" className="flex items-center gap-4 group">
                  <span className="w-10 h-10 border border-earth/30 flex items-center justify-center text-earth text-lg group-hover:bg-earth group-hover:text-obsidian transition-all duration-300">
                    ✉
                  </span>
                  <div>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-stone mb-0.5">
                      Correo
                    </p>
                    <p className="text-linen text-sm">info@rednatiperu.com</p>
                  </div>
                </a>
              </div>

              <div className="flex gap-4 mt-10">
                {[
                  { label: 'Instagram', href: 'https://instagram.com/rednatiperu' },
                  { label: 'Facebook', href: 'https://facebook.com/rednatiperu' },
                  { label: 'YouTube', href: 'https://youtube.com/@rednatiperu' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] tracking-[0.2em] uppercase text-stone/60 hover:text-earth transition-colors duration-300 border-b border-stone/20 hover:border-earth pb-0.5"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="anim-up">
              {formSent ? (
                <div className="border border-earth/30 p-10 text-center">
                  <p className="font-display italic text-2xl text-earth mb-3">¡Recibido!</p>
                  <p className="text-fog/70">
                    Hemos recibido tu mensaje. La comunidad Chankayán te responderá pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label
                      className="block text-[11px] tracking-[0.2em] uppercase text-stone mb-2"
                      htmlFor="name"
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border border-linen/10 px-4 py-3 text-linen text-sm focus:outline-none focus:border-earth/60 transition-colors duration-300 placeholder:text-stone/40"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[11px] tracking-[0.2em] uppercase text-stone mb-2"
                      htmlFor="email"
                    >
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border border-linen/10 px-4 py-3 text-linen text-sm focus:outline-none focus:border-earth/60 transition-colors duration-300 placeholder:text-stone/40"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[11px] tracking-[0.2em] uppercase text-stone mb-2"
                      htmlFor="message"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border border-linen/10 px-4 py-3 text-linen text-sm focus:outline-none focus:border-earth/60 transition-colors duration-300 resize-none placeholder:text-stone/40"
                      placeholder="¿Qué expedición te interesa? ¿Cuántas personas? ¿Tienes alguna pregunta especial?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-earth text-obsidian text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-amber transition-colors duration-300 cursor-pointer"
                  >
                    Enviar mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ALIADOS ────────────────────────────────────────────────────────── */}
      <section className="bg-obsidian py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-stone text-center mb-12 anim-up">
            Aliados y reconocimientos institucionales
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 stagger-wrap">
            {PARTNERS.map((p) => (
              <p
                key={p}
                className="stagger-item font-display italic text-stone/40 text-sm lg:text-base hover:text-fog/60 transition-colors duration-300"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-obsidian border-t border-linen/6 py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            <div>
              <p className="font-display text-[10px] tracking-[0.35em] uppercase text-earth mb-1">
                REDNATI Perú
              </p>
              <p className="font-display font-bold text-2xl text-linen mb-4">LlamaTrek</p>
              <p className="text-[13px] text-stone/60 leading-relaxed max-w-xs">
                Turismo indígena regenerativo en el territorio ancestral Chankayán, Huaral, Lima,
                Perú.
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-stone mb-4">Expediciones</p>
              <ul className="space-y-2">
                {['Ruta del Amanecer', 'Camino de los Apus', 'Expedición Chankayán'].map((e) => (
                  <li key={e}>
                    <button
                      onClick={() => scrollTo('expediciones')}
                      className="text-[13px] text-stone/60 hover:text-linen transition-colors duration-300 cursor-pointer"
                    >
                      {e}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase text-stone mb-4">Contacto</p>
              <ul className="space-y-2 text-[13px] text-stone/60">
                <li>
                  <a
                    href="https://wa.me/51960000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-linen transition-colors duration-300"
                  >
                    WhatsApp: +51 960 000 000
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@rednatiperu.com"
                    className="hover:text-linen transition-colors duration-300"
                  >
                    info@rednatiperu.com
                  </a>
                </li>
                <li>Huaral, Lima, Perú</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-linen/6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-[11px] text-stone/40">
              © 2025 LlamaTrek · REDNATI Perú · Red Nacional de Turismo Indígena del Perú
            </p>
            <p className="text-[11px] text-stone/30">
              Diseñado con respeto por la identidad ancestral Chankayán
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─── ExperienceRow subcomponent ────────────────────────────────────────────────
function ExperienceRow({ exp, flipped }: { exp: (typeof EXPERIENCES)[number]; flipped: boolean }) {
  return (
    <div
      className={`group grid md:grid-cols-2 border border-linen/6 hover:border-earth/20 transition-colors duration-500 ${
        flipped ? 'md:[direction:rtl]' : ''
      }`}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden bg-surface anim-img"
        style={{ aspectRatio: '16/9', direction: 'ltr' }}
      >
        <img
          src={exp.img}
          alt={exp.imgAlt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-obsidian/5 transition-all duration-500" />
        {/* Number overlay */}
        <span
          className="absolute top-5 left-5 font-display text-[11px] tracking-[0.3em] text-linen/50"
          style={{ direction: 'ltr' }}
        >
          {exp.num}
        </span>
      </div>

      {/* Content */}
      <div className="p-8 lg:p-12 flex flex-col justify-center" style={{ direction: 'ltr' }}>
        <p className="text-[10px] tracking-[0.35em] uppercase text-earth mb-2">{exp.sub}</p>
        <h3 className="font-display font-bold text-2xl lg:text-3xl text-linen mb-4">{exp.name}</h3>
        <p className="text-fog/70 leading-relaxed text-[15px] mb-8 max-w-md">{exp.desc}</p>
        <div className="flex items-center gap-6 text-[12px] text-stone/60 mb-8">
          <span>⏱ {exp.duration}</span>
          <span>⛰ {exp.alt}</span>
        </div>
        <button
          onClick={() =>
            document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="self-start px-6 py-3 border border-earth/40 text-earth text-[11px] tracking-[0.2em] uppercase hover:bg-earth hover:text-obsidian transition-all duration-300 cursor-pointer"
        >
          Consultar disponibilidad
        </button>
      </div>
    </div>
  )
}
