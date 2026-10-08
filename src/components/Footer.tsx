import { Github, Instagram, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'

function LogoIcon() {
  return <span className="portfolio-logo-icon" aria-hidden="true">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 20C4 20 4 14 10 10C16 6 20 4 20 4C20 4 18 8 14 14C10 20 4 20 4 20Z" fill="white" />
      <path d="M4 20L10 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </span>
}

function FooterCard() {
  return <motion.div className="portfolio-footer-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
    <div className="portfolio-footer-card-inner">
      <div className="portfolio-footer-grid">
        <section className="portfolio-footer-brand">
          <a className="portfolio-footer-logo" href="#top" aria-label="Kshitij portfolio home"><LogoIcon /><span>Portfolio</span></a>
          <p className="portfolio-footer-description">Full Stack Developer and Computer Science student building thoughtful, user-focused digital experiences.</p>
          <div className="portfolio-footer-socials" aria-label="Social links">
            <a href="https://github.com/rajkshitij620-cmd" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            <a href="https://www.linkedin.com/in/kshitij-raj-298650328/?isSelfProfile=true" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <span className="portfolio-footer-social-placeholder" role="img" aria-label="Instagram link coming soon"><Instagram /></span>
          </div>
          <a className="contact-button" href="/contact">Contact Me</a>
        </section>

        <nav className="portfolio-footer-column" aria-label="Explore">
          <h2>Explore</h2>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="/contact">Contact</a>
        </nav>

        <section className="portfolio-footer-column">
          <h2>Toolkit</h2>
          <span>React &amp; TypeScript</span>
          <span>Node.js &amp; Express.js</span>
          <span>MongoDB</span>
          <span>Tailwind CSS</span>
        </section>

        <section className="portfolio-footer-column portfolio-footer-connect">
          <h2>Connect</h2>
          <a href="https://github.com/rajkshitij620-cmd" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <a href="https://www.linkedin.com/in/kshitij-raj-298650328/?isSelfProfile=true" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <span>Instagram <small>Coming soon</small></span>
        </section>
      </div>
    </div>

    <div className="portfolio-footer-legal">
      <p>© 2026 Kshitij. All rights reserved.</p>
      <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
    </div>
  </motion.div>
}

function GlassText() {
  return <div className="portfolio-glass-wrap" aria-hidden="true">
    <svg className="portfolio-glass-filter" aria-hidden="true" focusable="false">
      <defs>
        <filter id="portfolio-glass-effect" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" result="outer-shadow" />
          <feComponentTransfer in="SourceAlpha" result="alpha"><feFuncA type="linear" slope="1" /></feComponentTransfer>
          <feOffset in="alpha" dx="0" dy="4" result="offset-white" />
          <feGaussianBlur in="offset-white" stdDeviation="4" result="blur-white" />
          <feComposite in="alpha" in2="blur-white" operator="out" result="inner-white-mask" />
          <feFlood floodColor="#ffffff" floodOpacity="0.25" result="white-fill" />
          <feComposite in="white-fill" in2="inner-white-mask" operator="in" result="inner-white-final" />
          <feGaussianBlur in="alpha" stdDeviation="6" result="blur-black" />
          <feComposite in="alpha" in2="blur-black" operator="out" result="inner-black-mask" />
          <feFlood floodColor="#000000" floodOpacity="0.25" result="black-fill" />
          <feComposite in="black-fill" in2="inner-black-mask" operator="in" result="inner-black-final" />
          <feMerge>
            <feMergeNode in="outer-shadow" />
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="inner-white-final" />
            <feMergeNode in="inner-black-final" />
          </feMerge>
        </filter>
      </defs>
    </svg>
    <motion.div className="portfolio-glass-word-wrap" initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}>
      <h2 className="portfolio-glass-word" style={{ filter: 'url(#portfolio-glass-effect)' }}>Portfolio</h2>
    </motion.div>
  </div>
}

export default function Footer() {
  return <footer className="portfolio-footer">
    <FooterCard />
    <GlassText />
  </footer>
}
