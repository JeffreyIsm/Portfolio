import { motion } from "motion/react";

export function AnimatedLogo({ href, imgSrc, alt, delay }) {
  return (
    <motion.a
      href={href}
      {...(!isMailto && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
      className="hover:opacity-80 transition-opacity"
      initial={{ opacity: 0, scale: 0.5, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <img src={imgSrc} alt={alt} className="h-8 w-8" />
    </motion.a>
  );
}