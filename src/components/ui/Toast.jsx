import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
export default function Toast({ message, type='success', duration=2500, onDone }) {
  const [open, setOpen] = useState(Boolean(message))
  useEffect(()=>{ if(!message) return; const t=setTimeout(()=>{ setOpen(false); onDone?.() }, duration); return ()=>clearTimeout(t)},[message])
  if(!message) return null
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {open && (
          <motion.div initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{y:20,opacity:0}}>
            <div className={`px-4 py-2 rounded-lg shadow-lg text-white ${type === 'error' ? 'bg-red-600' : 'bg-emerald-600'}`}>
              {message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
