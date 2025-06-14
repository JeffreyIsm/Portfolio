"use client"

import { motion } from "motion/react"

export default function Arrow() {
  const barVariants = {
    jump: {
      y: -10,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  }

  return (
    <motion.div
      animate="jump"
      transition={{ staggerChildren: 0.2 }}
      className="v-stack bg-black"
    >
      {/* 3 stacked Vs */}
      {[...Array(3)].map((_, i) => (
        <motion.div key={i} className="v-container" variants={barVariants}>
          <motion.div className="v-bar left" variants={barVariants} />
          <motion.div className="v-bar right" variants={barVariants} />
        </motion.div>
      ))}
      <StyleSheet />
    </motion.div>
  )
}

function StyleSheet() {
  return (
    <style>
      {`
        .v-stack {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0px;
        }

        .v-container {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 8px;
        }

        .v-bar {
          width: 6px;
          height: 70px;
          background-color: #ff0000;
          border-radius: 3px;
        }

        .left {
            transform: rotate(-135deg) translateY(0px) !important;
            transform-origin: top right;
        }

        .right {
            transform: rotate(135deg) translateY(0px) !important;
            transform-origin: top left;
        }

      `}
    </style>
  )
}
