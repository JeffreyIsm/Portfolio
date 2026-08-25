"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"

// builtFor = WHO IT SERVES. Drives the "Built for -> ..." label.
//   "Client" | "University" | "Personal"
// Whether a project was self-started is carried by the description prose
// ("I noticed X, so I built Y"), not by a field.
export default function Proj() {
  const items = [
    {
      id: 5,
      title: "Campus Marketplace Platform",
      text: `On dorm move-out day I saw how many usable items were being thrown out, so I built a peer-to-peer marketplace for the NYU Shanghai community. @nyu.edu sign-in keeps it to students, with real-time messaging between buyers and sellers.`,
      image: "./images/studentrades_web.webp",
      imgW: 1400,
      imgH: 745,
      builtFor: "University",
      link: "https://studentrades.xyz/",
      linkReason: null,
      techStack: "React - FastAPI - Supabase",
    },
    {
      id: 1,
      title: "Townhouse Management System",
      text: `Replaced a client’s manual Excel-based process of tracking tenants, payments, and due dates, by building a full-stack hotel management system`,
      image: "./images/townhouse_web.webp",
      imgW: 1292,
      imgH: 627,
      builtFor: "Client",
      link: null,
      linkReason: "Can't share more images due to confidentiality",
      techStack: "Basic HTML/CSS/JS - Django - PostgreSQL",
    },
    {
      id: 2,
      title: "ML Audio Denoise",
      text: `My brother was struggling to record videos with noisy background, so I ATTEMPTED to fix it...`,
      image: "./images/aimodel_web.webp",
      imgW: 1019,
      imgH: 794,
      builtFor: "Personal",
      link: "https://audio-denoise.vercel.app/",
      linkReason: null,
      techStack: "Tensorflow, Linux, FastAPI, React",
    },
    {
      id: 3,
      title: "Scholarship Platform",
      text: `Built for Indohelp, connecting students seeking scholarships with the donors who fund them. Applicants and donors each register through their own flow, and an admin dashboard handles search, filtering, and record management across every submission.`,
      image: "./images/indohelp_web.webp",
      imgW: 1400,
      imgH: 641,
      builtFor: "Client",
      link: "https://www.indohelp.org/",
      linkReason: null,
      techStack: "React - Django - PostgreSQL",
    },
    {
      id: 4,
      title: "Asia Advisory",
      text: `Built a clear online presence for Asia Advisory, a firm connecting established, restructuring, and growth-stage companies with equity investors and bank or non-bank financing. The site presents its advisory capabilities, previous deals across industries, leadership team, and contact details.`,
      image: "./images/asiaadvisory.webp",
      imgW: 1879,
      imgH: 862,
      builtFor: "Client",
      link: "https://asia-advisory.com/",
      linkReason: null,
      techStack: "React",
    },
  ]
  // Category order follows first appearance in `items`, so adding a project
  // with a new builtFor value adds a step to the switcher automatically.
  const categories = useMemo(
    () => [...new Set(items.map((i) => i.builtFor))],
    [items]
  )

  const [catIndex, setCatIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [selectedId, setSelectedId] = useState(null)
  const reduceMotion = useReducedMotion()

  const category = categories[catIndex]
  const inCategory = useMemo(
    () => items.filter((i) => i.builtFor === category),
    [items, category]
  )

  // Derived, not stored: if the remembered id isn't in this category, fall back
  // to its first project. Avoids an effect that resets state on every switch.
  const selected = inCategory.find((i) => i.id === selectedId) ?? inCategory[0]

  const step = (dir) => {
    setDirection(dir)
    setCatIndex((i) => (i + dir + categories.length) % categories.length)
    setSelectedId(null)
  }

  const slide = {
    enter: (dir) => ({ opacity: 0, x: reduceMotion ? 0 : dir * 24 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: reduceMotion ? 0 : dir * -24 }),
  }

  const arrow =
    "px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"

  return (
    <div className="section-pad flex flex-col items-center min-h-screen">
      <div className="w-[90vw] md:w-[80vw] max-w-6xl flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Left: the projects in this category */}
        <div className="md:w-1/3">
        <h1 className='font-michroma-regular text-white text-3xl md:text-4xl font-bold pb-6 md:pb-8'>
          Projects
        </h1>

        {/* Built for -> [ < CATEGORY > ] */}
        <div className="flex items-center gap-3 mb-3">
          <span className="font-michroma-regular text-white/60 text-sm md:text-base whitespace-nowrap">
            Built for
          </span>
          <div className="flex items-center rounded-lg border border-white/20 overflow-hidden">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous category"
              className={arrow}
            >
              &#8592;
            </button>
            <div className="relative h-12 w-[9rem] md:w-[10rem] flex items-center justify-center overflow-hidden border-x border-white/20">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.span
                  key={category}
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
                  className="font-michroma-regular text-white text-base md:text-lg whitespace-nowrap"
                >
                  {category}
                </motion.span>
              </AnimatePresence>
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next category"
              className={arrow}
            >
              &#8594;
            </button>
          </div>
        </div>

        <p className="text-white/40 text-sm mb-6" aria-live="polite">
          {inCategory.length} {inCategory.length === 1 ? "project" : "projects"}
        </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.2,
                staggerChildren: reduceMotion ? 0 : 0.06,
              }}
              className="flex flex-col gap-3"
            >
              {inCategory.map((p) => {
                const active = selected?.id === p.id
                return (
                  <motion.button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedId(p.id)}
                    aria-current={active ? "true" : undefined}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.3 }}
                    className={`w-full text-left px-5 py-4 rounded-lg font-bold cursor-pointer transition-all border ${
                      active
                        ? "bg-white text-black border-white"
                        : "text-white border-white/20 hover:border-white/40"
                    }`}
                  >
                    {p.title}
                  </motion.button>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: the selected project */}
        <div className="md:w-2/3">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
                className="w-full p-4 md:p-8 rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm"
              >
                <motion.img
                  src={selected.image}
                  alt={selected.title}
                  width={selected.imgW}
                  height={selected.imgH}
                  decoding="async"
                  initial={{ scale: reduceMotion ? 1 : 1.04 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
                  className="w-full h-auto max-h-[280px] md:max-h-[360px] object-contain rounded-xl mb-4 md:mb-6"
                />
                <p className='m-0 whitespace-pre-line text-sm md:text-base text-gray-200'>
                  {selected.text}
                </p>
                <div className="mt-4 text-sm md:text-base text-white">
                  <span className="font-bold">Link: </span>
                  {selected.link ? (
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-red-400 hover:text-red-300 transition-colors"
                    >
                      {selected.link}
                    </a>
                  ) : (
                    <span className="text-gray-400">{selected.linkReason}</span>
                  )}
                </div>
                <div className="mt-1 text-sm md:text-base text-white">
                  <span className="font-bold">Tech stacks: </span>
                  <span className="text-gray-300">{selected.techStack}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
