import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function ExperienceCard({ exp, isVisible, onToggle, onClose }) {
  const cardRef = useRef(null);

  return (
    <div className="relative text-center">
      <img
        src={exp.logo}
        alt={exp.org}
        className={`h-32 md:h-40 cursor-pointer hover:opacity-90 transition-opacity ${
          exp.logoRounded ? "rounded-full" : ""
        }`}
        onClick={onToggle}
      />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={cardRef}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[90vw] md:w-[600px] bg-black/50 border border-white/20 p-4 rounded-xl shadow-lg z-10 text-left space-y-3 text-bg"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <img
                src={exp.image}
                className="h-40 w-full md:w-80 object-cover rounded"
                alt={exp.title}
              />
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <h4 className="text-sm text-gray-300">{exp.org}</h4>
                <h5 className="text-sm text-gray-400">{exp.date}</h5>
                <h5 className="text-sm text-gray-400">{exp.location}</h5>
              </div>
            </div>
            <p className="text-sm text-gray-200">{exp.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 