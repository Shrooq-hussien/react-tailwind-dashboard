// src/components/ui/Card.jsx
import { motion } from 'framer-motion'
import clsx from 'clsx'

/**
 * Reusable Card with hover "lift" effect.
 * Wraps children inside Tailwind .card styles.
 */
export default function Card({ children, className = '', ...rest }) {
  return (
    <motion.div
      className={clsx('card', className)}
      whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
