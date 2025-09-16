import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button.jsx'
export default function Modal({ open, title, children, onClose, footer }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
          <div className="absolute inset-0 bg-black/40" onClick={onClose}/>
          <motion.div
            className="relative card w-[95%] sm:w-[560px]"
            initial={{scale:.95, y:10, opacity:0}}
            animate={{scale:1, y:0, opacity:1}}
            exit={{scale:.95, y:10, opacity:0}}
          >
            <div className="border-b dark:border-slate-700 px-6 py-3 font-semibold">{title}</div>
            <div className="card-body">{children}</div>
            <div className="border-t dark:border-slate-700 px-6 py-3 flex gap-2 justify-end">
              {footer || <Button onClick={onClose}>Close</Button>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
