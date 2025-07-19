"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Proj() {
  const items = [
    {
      id: 1,
      title: "Townhouse Management System",
      text: `Replaced a client’s manual Excel-based process of tracking tenants, payments, and due dates, by building a full-stack hotel management system`,
      image: "./images/townhouse.PNG",
      link: null,
      linkReason: "Can't share more images due to confidentiality",
      techStack: "Basic HTML/CSS/JS - Django - PostgreSQL",
    },
    {
      id: 2,
      title: "ML Audio Denoise",
      text: `My brother was struggling to record videos with noisy background, so I ATTEMPTED to fix it...`,
      image: "./images/AIModel.png",
      link: "https://audio-denoise.vercel.app/",
      linkReason: null,
      techStack: "Tensorflow, Linux, FastAPI, React",
    },
    {
      id: 3,
      title: "Full-stack Developer",
      text: `Coming Soon... Currently working on 2 different projects`,
      image: "./images/football.png",
      link: null,
      linkReason: "No public link yet.",
      techStack: "React - Django - PostgreSQL",
    },
    {
      id: 4,
      title: "Frontend Website Developer",
      text: `Hemisphere`,
      image: "./images/hemishphere.png",
      link: null,
      linkReason: "Link yet to be published (ongoing project)",
      techStack: "React",
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
            <div className="mt-2 text-sm md:text-base text-white">
              <span className="font-bold">Link: </span>
              {items[selected].link ? (
                <a href={items[selected].link} target="_blank" rel="noopener noreferrer" className="underline text-blue-400">{items[selected].link}</a>
              ) : (
                <span>{items[selected].linkReason}</span>
              )}
            </div>
            <div className="mt-1 text-sm md:text-base text-white">
              <span className="font-bold">Tech stacks: </span>{items[selected].techStack}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}