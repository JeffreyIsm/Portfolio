"use client"

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Folder from "../components/Folder";

// Paths are relative to the page ("./"), not the bundle ("../") -- that's what
// keeps them resolving under the /portfolio/ base on GitHub Pages.
const certificates = [
  { src: "./images/mlcert.jpg", label: "Machine Learning" },
  { src: "./images/pythoncert.jpg", label: "Python" },
];

export default function Cert() {
  const [zoomed, setZoomed] = useState(null);

  const papers = certificates.map((cert) => (
    <img
      key={cert.src}
      src={cert.src}
      alt={cert.label}
      title={cert.label}
      onClick={(e) => {
        // The whole folder is a click-to-toggle button, so without this the
        // folder would snap shut the moment you reach for a certificate.
        e.stopPropagation();
        setZoomed(cert);
      }}
      className="w-full h-full object-cover rounded-[10px] cursor-zoom-in"
    />
  ));

  return (
    <div className="section-pad w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Left: heading + subtext */}
        <div className="md:w-1/2 text-center md:text-left pl-10">
          <h1 className="font-michroma-regular text-white text-3xl md:text-5xl font-bold pb-2 md:pb-3">
            Certificates / Courses
          </h1>
          <p className="text-white/50 max-w-md mx-auto md:mx-0">
            Click the folder to open it, then click a certificate to enlarge.
          </p>
        </div>

        {/* Right: folder. `size` scales via transform, which leaves the layout
            box at its unscaled 100x80 -- so the wrapper reserves the height. */}
        <div className="md:w-1/2 flex items-center justify-center h-[260px] md:h-[320px] pt-10">
          <Folder color="#ef4444" size={2.2} items={papers} />
        </div>
      </div>

      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setZoomed(null)}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/85 backdrop-blur-sm p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={zoomed.src}
              alt={zoomed.label}
              className="max-h-[80vh] max-w-full object-contain rounded-xl"
            />
            <p className="text-white/70 text-sm">{zoomed.label} — click anywhere to close</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
