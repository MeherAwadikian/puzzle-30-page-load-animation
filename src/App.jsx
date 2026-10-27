import { motion } from 'framer-motion'

// Verification aid only: ?slow=8 stretches every duration/delay by that
// factor so the sequence is slow enough to inspect frame-by-frame (e.g. via
// screenshots) instead of trusting the code alone. No effect without the
// query param.
const SLOW = Math.max(1, Number(new URLSearchParams(location.search).get('slow')) || 1)
const t = (n) => n * SLOW

// One root variant drives the whole page-load SEQUENCE: each tier waits for
// the previous one via `delayChildren`/`staggerChildren` on nested variant
// groups, rather than each element having its own independent hardcoded
// delay (which would be a parallel-animation, not a sequence).
const page = {
  hidden: {},
  show: {
    transition: { staggerChildren: t(0.18), delayChildren: t(0.1) },
  },
}

const fadeDown = {
  hidden: { opacity: 0, y: -16 },
  show: { opacity: 1, y: 0, transition: { duration: t(0.5), ease: 'easeOut' } },
}

const navGroup = {
  hidden: {},
  show: { transition: { staggerChildren: t(0.08) } },
}

const navItem = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: t(0.35) } },
}

const heroGroup = {
  hidden: {},
  show: { transition: { staggerChildren: t(0.12), delayChildren: t(0.1) } },
}

const heroLine = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: t(0.55), ease: [0.16, 1, 0.3, 1] },
  },
}

const ctaPop = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: SLOW > 1
      ? { duration: t(0.4), ease: 'easeOut' }
      : { type: 'spring', stiffness: 260, damping: 18 },
  },
}

const bgFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: t(1.1) } },
}

export default function App() {
  return (
    <motion.div
      className="page"
      variants={page}
      initial="hidden"
      animate="show"
    >
      <motion.div className="bg-glow" variants={bgFade} data-testid="bg-glow" />

      <motion.header className="logo-row" variants={fadeDown} data-testid="logo">
        <span className="logo-mark">◆</span>
        <span className="logo-text">Forge Studio</span>
      </motion.header>

      <motion.nav className="nav" variants={navGroup} data-testid="nav">
        {['Work', 'Process', 'Pricing', 'Contact'].map((label) => (
          <motion.a key={label} href="#" variants={navItem} className="nav-link">
            {label}
          </motion.a>
        ))}
      </motion.nav>

      <motion.main className="hero" variants={heroGroup}>
        <motion.p className="hero-eyebrow" variants={heroLine} data-testid="eyebrow">
          Now booking Q1 slots
        </motion.p>
        <motion.h1 className="hero-title" variants={heroLine} data-testid="headline">
          Interfaces that feel considered,
          <br />
          not just decorated.
        </motion.h1>
        <motion.p className="hero-sub" variants={heroLine} data-testid="subheadline">
          We design and build product sites with the kind of motion that
          explains hierarchy instead of just showing off.
        </motion.p>
        <motion.div variants={heroLine}>
          <motion.a
            href="#"
            className="cta"
            variants={ctaPop}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            data-testid="cta"
          >
            Start a project →
          </motion.a>
        </motion.div>
      </motion.main>
    </motion.div>
  )
}
