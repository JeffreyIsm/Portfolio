"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Proj() {
  const items = [
    {
      id: 1,
      title: "Townhouse Management System",
      text: `Features: Admin login page, email reminder for payment due, dynamic coloring
      Can't share more images due to confidentiality`,
      image: "./images/townhouse.PNG",
    },
    {
      id: 2,
      title: "Frontend Website Developer",
      text: `Hemisphere: Link yet to be published (ongoing project)
      Other websites developed: asia-advisory.com`,
      image: "./images/hemishphere.png",
    },
  ]
  const [selected, setSelected] = useState(0)

  return (
    <div className="flex flex-col items-center p-4 md:p-10 bg-black min-h-screen md:pb-30 md:pt-5">
      <h1
        className='font-michroma-regular text-white text-3xl md:text-5xl font-bold pb-8 md:pb-15 pt-4 md:pt-0 text-center'
      >
        Projects
      </h1>

      {/* Selectable Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 md:mb-10">
        {items.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setSelected(index)}
            className="min-w-[200px] px-6 py-3 rounded-lg font-bold cursor-pointer transition-all text-base bg-black border border-white/20 hover:border-white/40"
            style={{
              backgroundColor: selected === index ? "#fff" : "transparent",
              color: selected === index ? "#000" : "#fff",
            }}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Animated Box */}
      <AnimatePresence mode="wait">
        {selected !== null && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="w-[90vw] md:w-[70vw] p-4 md:p-8 rounded-3xl flex flex-col items-center text-center bg-gradient-to-br from-white/10 to-white/5 text-white border border-white/10"
          >
            <motion.img
              src={items[selected].image}
              alt={`Item ${items[selected].id}`}
              className="w-full max-w-[600px] h-auto max-h-[300px] md:max-h-[400px] object-contain rounded-xl mb-4 md:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            />
            <motion.p
              className='m-0 whitespace-pre-line text-sm md:text-base max-w-2xl'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {items[selected].text}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}