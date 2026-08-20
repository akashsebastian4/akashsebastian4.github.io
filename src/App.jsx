import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import logo from './assets/juspay-logo.svg'
import logoWhite from './assets/juspay-logo-white.svg'

gsap.registerPlugin(useGSAP)

const TICKER =
  'LIVE BUG BOUNTY // APPLICATIONS OPEN // JUSPAY SECURITY TEAM // HACK. REPORT. REPEAT. // '

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  )
}

function PixelCheck() {
  // 8-bit check mark, blue on yellow tile
  return (
    <svg className="success__icon" width="56" height="56" viewBox="0 0 14 14" shapeRendering="crispEdges" aria-hidden="true">
      <rect width="14" height="14" fill="#f5d90a" />
      <g fill="#2b4ad9">
        <rect x="2" y="7" width="2" height="2" />
        <rect x="4" y="9" width="2" height="2" />
        <rect x="6" y="7" width="2" height="2" />
        <rect x="8" y="5" width="2" height="2" />
        <rect x="10" y="3" width="2" height="2" />
      </g>
    </svg>
  )
}

export default function App() {
  const root = useRef(null)
  const [sent, setSent] = useState(false)
  const [firstName, setFirstName] = useState('')

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // one quick snap in — no drawn-out staggers
        gsap
          .timeline({ defaults: { ease: 'steps(3)', duration: 0.25 } })
          .from('.eyebrow, .headline, .hero__copy, .hero__hint', { y: 14, autoAlpha: 0, stagger: 0.04 })
          .from('.window-wrap', { y: 14, autoAlpha: 0 }, '-=0.15')

        // block cursor blink
        gsap.to('.cursor', { opacity: 0, duration: 0.55, repeat: -1, yoyo: true, ease: 'steps(1)' })

        // ticker marquee — track holds two identical segments
        gsap.to('.ticker__track', { xPercent: -50, duration: 22, repeat: -1, ease: 'none' })
      })
    },
    { scope: root }
  )

  useGSAP(
    () => {
      if (!sent) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.success > *', { y: 18, autoAlpha: 0, stagger: 0.09, duration: 0.35, ease: 'steps(4)' })
      })
    },
    { scope: root, dependencies: [sent] }
  )

  function handleSubmit(e) {
    e.preventDefault()
    const name = new FormData(e.currentTarget).get('name') || ''
    setFirstName(name.trim().split(/\s+/)[0])
    setSent(true)
  }

  return (
    <div className="page" ref={root}>
      <header className="header">
        <img className="header__logo" src={logo} alt="Juspay" width="98" height="30" fetchPriority="high" />
        <span className="header__tag">Live hacking event</span>
      </header>
      <div className="header__rule" />

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          <span className="ticker__seg">{TICKER}</span>
          <span className="ticker__seg">{TICKER}</span>
        </div>
      </div>

      <main className="hero">
        <section className="hero__intro">
          <span className="dither dither--a" aria-hidden="true" />
          <span className="dither dither--b" aria-hidden="true" />
          <span className="dither dither--c" aria-hidden="true" />

          <p className="eyebrow">Juspay security presents</p>
          <h1 className="headline">
            <span className="headline__line">Live bug</span>
            <span className="headline__line">
              bounty<span className="cursor" aria-hidden="true" />
            </span>
          </h1>
          <p className="hero__copy">
            A live hacking event by the Juspay security team. Break things in the
            open, side by side with the people who built them.
          </p>
          <p className="hero__hint">
            <svg width="14" height="14" viewBox="0 0 7 7" shapeRendering="crispEdges" aria-hidden="true">
              <g fill="currentColor">
                <rect x="0" y="0" width="1" height="5" />
                <rect x="1" y="1" width="1" height="3" />
                <rect x="2" y="2" width="1" height="3" />
                <rect x="3" y="3" width="2" height="1" />
                <rect x="4" y="4" width="2" height="1" />
                <rect x="5" y="5" width="2" height="1" />
              </g>
            </svg>
            Register to hunt
          </p>
        </section>

        <section className="window-wrap" aria-label="Registration">
          <div className="window">
            <div className="window__bar">
              <span className="window__title">REGISTRATION.EXE</span>
              <span className="window__x" aria-hidden="true">
                X
              </span>
            </div>
            <div className="window__body">
              {sent ? (
                <div className="success" role="status">
                  <PixelCheck />
                  <p className="success__title">APPLICATION SENT</p>
                  <p className="success__copy">
                    {firstName ? `GG, ${firstName}. ` : ''}The security team will
                    review your application and get back to you by email.
                  </p>
                  <button className="success__again" type="button" onClick={() => setSent(false)}>
                    REGISTER ANOTHER
                  </button>
                </div>
              ) : (
                <form className="form" onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="field__label" htmlFor="name">
                      Full name <em>*</em>
                    </label>
                    <input id="name" name="name" type="text" required autoComplete="name" placeholder="Ada Lovelace" />
                  </div>

                  <div className="field">
                    <label className="field__label" htmlFor="email">
                      Email <em>*</em>
                    </label>
                    <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
                  </div>

                  <div className="field">
                    <label className="field__label" htmlFor="profile">
                      HackerOne / GitHub / portfolio
                    </label>
                    <input id="profile" name="profile" type="url" placeholder="https://hackerone.com/you" />
                  </div>

                  <div className="form__cta">
                    <button className="btn" type="submit">
                      Apply now
                      <span className="btn__arrow">
                        <ArrowIcon />
                      </span>
                    </button>
                    <p className="form__note">Selected hackers are notified by email.</p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <img className="footer__logo" src={logoWhite} alt="Juspay" width="84" height="26" loading="lazy" />
          <span className="footer__sep" aria-hidden="true" />
          <span className="footer__text">Security team · Live bug bounty</span>
        </div>
      </footer>
    </div>
  )
}
