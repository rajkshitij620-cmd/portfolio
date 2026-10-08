import { useEffect, useRef, useState, type ElementType, type MouseEvent, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Footer from './components/Footer'
import ContactPage from './components/ContactPage'

const marqueeImages = [
  'hero-space-voyage-preview-eECLH3Yc', 'hero-codenest-preview-Cgppc2qV', 'hero-vex-ventures-preview-BczMFIiw',
  'hero-stellar-ai-v2-preview-DjvxjG3C', 'hero-asme-preview-B_nGDnTP', 'hero-transform-data-preview-Cx5OU29N',
  'hero-vitara-preview-Cjz2QYyU', 'hero-terra-preview-BFjrCr7T', 'hero-skyelite-preview-DHaZIgUv',
  'hero-aethera-preview-DknSlcTa', 'hero-designpro-preview-D8c5_een', 'hero-stellar-ai-preview-D3HL6bw1',
  'hero-xportfolio-preview-D4A8maiC', 'hero-orbit-web3-preview-BXt4OttD', 'hero-nexora-preview-cx5HmUgo',
  'hero-evr-ventures-preview-DZxeVFEX', 'hero-planet-orbit-preview-DWAP8Z1P', 'hero-new-era-preview-CocuDUm9',
  'hero-wealth-preview-B70idl_u', 'hero-luminex-preview-CxOP7ce6', 'hero-celestia-preview-0yO3jXO8',
].map((name) => `https://motionsites.ai/assets/${name}.gif`)

const portrait = 'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png'
const decor = {
  moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  object: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  group: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
}

const projects = [
  { name: 'Nextlevel Studio', type: 'Client', images: [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  ] },
  { name: 'Aura Brand Identity', type: 'Personal', images: [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  ] },
  { name: 'Solaris Digital', type: 'Client', images: [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  ] },
]

const services = [
  ['Full Stack Development', 'Building scalable and modern web applications from frontend interfaces to backend systems and databases.'],
  ['Frontend Development', 'Creating responsive and interactive interfaces using React, TypeScript, JavaScript, and Tailwind CSS.'],
  ['Backend Development', 'Building secure APIs, authentication systems, database integrations, and reliable server-side applications using Node.js, Express, Python, and modern backend technologies.'],
  ['AI Integration', 'Adding intelligent AI-powered features to modern web applications and digital products.'],
  ['UI/UX & Web Design', 'Designing clean, intuitive, and engaging digital experiences focused on usability and modern visual design.'],
]

function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, as = 'div', className = '' }: {
  children: ReactNode; delay?: number; duration?: number; x?: number; y?: number; as?: ElementType; className?: string
}) {
  const Component = motion.create(as)
  return <Component className={className} initial={{ opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: '50px', amount: 0 }} transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}>{children}</Component>
}

function ContactButton({ className = '' }: { className?: string }) {
  return <a className={`contact-button ${className}`} href="/contact">Contact Me</a>
}

function LiveProjectButton() {
  return <a className="live-button" href="/contact">Live Project</a>
}

function Magnet({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('translate3d(0, 0, 0)')
  const [active, setActive] = useState(false)
  const move = (event: MouseEvent<HTMLDivElement>) => {
    const box = ref.current?.getBoundingClientRect()
    if (!box) return
    const dx = event.clientX - (box.left + box.width / 2)
    const dy = event.clientY - (box.top + box.height / 2)
    const outsideX = Math.max(0, Math.abs(dx) - box.width / 2)
    const outsideY = Math.max(0, Math.abs(dy) - box.height / 2)
    if (Math.hypot(outsideX, outsideY) > 150) return
    setActive(true)
    setTransform(`translate3d(${dx / 3}px, ${dy / 3}px, 0)`)
  }
  return <div ref={ref} className="magnet" onMouseMove={move} onMouseLeave={() => { setActive(false); setTransform('translate3d(0, 0, 0)') }} style={{ transform, transition: active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out' }}>{children}</div>
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const update = () => {
      if (!sectionRef.current) return
      const top = sectionRef.current.getBoundingClientRect().top + window.scrollY
      setOffset((window.scrollY - top + window.innerHeight) * 0.3)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return <section ref={sectionRef} className="marquee-section" aria-label="Selected visual work">
    {[marqueeImages.slice(0, 11), marqueeImages.slice(11)].map((row, rowIndex) => <div className="marquee-row" key={rowIndex}>
      <div className="marquee-track" style={{ transform: `translateX(${rowIndex === 0 ? offset - 200 : -(offset - 200)}px)` }}>
        {[0, 1, 2].map((copy) => <div className="marquee-group" key={copy}>{row.map((src, index) => <img key={`${copy}-${index}`} src={src} alt="3D and digital design project preview" loading="lazy" />)}</div>)}
      </div>
    </div>)}
  </section>
}

function AboutCopy({ text }: { text: string }) {
  return <div className="about-copy">{text.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
}

function HeroSection() {
  return <section className="hero" id="top">
    <FadeIn as="nav" className="navbar" y={-20}>
      <a href="#about">About</a><a href="#services">Price</a><a href="#projects">Projects</a><a href="/contact">Contact</a>
    </FadeIn>
    <div className="heading-window"><FadeIn as="h1" className="hero-heading hero-title" delay={0.15} y={40}>Hi, i&apos;m Kshitij</FadeIn></div>
    <Magnet><FadeIn as="div" className="portrait-wrap" delay={0.6} y={30}><img src={portrait} alt="Kshitij, Full Stack Developer" /></FadeIn></Magnet>
    <div className="hero-bottom">
      <FadeIn as="p" className="hero-intro" delay={0.35} y={20}>Full Stack Developer passionate about building modern web applications, exploring AI, and turning ideas into scalable digital products.</FadeIn>
      <FadeIn delay={0.5} y={20}><ContactButton /></FadeIn>
    </div>
  </section>
}

function AboutSection() {
  return <section className="about" id="about">
    <FadeIn className="decor decor-moon" delay={0.1} x={-80} y={0} duration={0.9}><img src={decor.moon} alt="" /></FadeIn>
    <FadeIn className="decor decor-object" delay={0.25} x={-80} y={0} duration={0.9}><img src={decor.object} alt="" /></FadeIn>
    <FadeIn className="decor decor-lego" delay={0.15} x={80} y={0} duration={0.9}><img src={decor.lego} alt="" /></FadeIn>
    <FadeIn className="decor decor-group" delay={0.3} x={80} y={0} duration={0.9}><img src={decor.group} alt="" /></FadeIn>
    <div className="about-content">
      <FadeIn as="h2" className="hero-heading section-heading" y={40}>About me</FadeIn>
      <AboutCopy text={'I’m a passionate Full Stack Developer and Computer Science student who enjoys building modern, scalable, and user-focused web applications. I work with technologies like React, JavaScript, TypeScript, Node.js, Express.js, MongoDB, Tailwind CSS, and AI-powered tools.\n\nI enjoy turning ideas into real-world products, exploring new technologies, and solving problems through clean and efficient code. I’m currently focused on strengthening my skills in full-stack development, AI integration, and software engineering while building projects that create meaningful user experiences.'} />
      <FadeIn className="about-contact"><ContactButton /></FadeIn>
    </div>
  </section>
}

function ServicesSection() {
  return <section className="services" id="services">
    <FadeIn as="h2" className="section-heading services-heading">Services</FadeIn>
    <div className="services-list">{services.map(([name, description], index) => <FadeIn as="article" className="service-item" key={name} delay={index * 0.1}>
      <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
      <div><h3>{name}</h3><p>{description}</p></div>
    </FadeIn>)}</div>
  </section>
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (projects.length - 1 - index) * 0.03])
  return <div className="project-stage" style={{ top: `calc(6rem + ${index * 28}px)` }}>
    <motion.article ref={ref} className="project-card" style={{ scale }}>
      <div className="project-header">
        <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
        <div className="project-title"><span>{project.type}</span><h3>{project.name}</h3></div>
        <LiveProjectButton />
      </div>
      <div className="project-images">
        <div className="project-image-stack"><img src={project.images[0]} alt={`${project.name} project detail`} loading="lazy" /><img src={project.images[1]} alt={`${project.name} project detail`} loading="lazy" /></div>
        <img className="project-image-tall" src={project.images[2]} alt={`${project.name} project overview`} loading="lazy" />
      </div>
    </motion.article>
  </div>
}

function ProjectsSection() {
  return <section className="projects" id="projects">
    <FadeIn as="h2" className="hero-heading section-heading">Project</FadeIn>
    <div className="project-list">{projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}</div>
  </section>
}

export default function App() {
  if (window.location.pathname.replace(/\/+$/, '') === '/contact') return <ContactPage />
  return <main className="page-shell"><HeroSection /><MarqueeSection /><AboutSection /><ServicesSection /><ProjectsSection /><Footer /></main>
}
