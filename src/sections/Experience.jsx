"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const experiences = [
  {
    id: "robotics",
    logo: "./images/robotics.jpeg",
    image: "./images/robots_team.jpg",
    title: "Board Member",
    org: "Robotics Club at NYU Shanghai",
    date: "Sep 2024 - Present",
    location: "Shanghai, China (On-site)",
    description:
      "Together with the core team: Developed the NYU Shanghai Robotics website, designed, built, and competed in the Asia Open VEX-U Robotics Competition. Learned how to integrate code with robotic hardware.",
    logoRounded: true,
  },
  {
    id: "bca",
    logo: "./images/bca.jpg",
    image: "./images/bcaintern.jpg",
    title: "Information Technology Business Analyst",
    org: "Internship - Bank Central Asia (BCA)",
    date: "Dec 2022 - Jan 2023",
    location: "Jakarta, Indonesia (On-site)",
    description:
      "Researched security & Customer service, Joined meetings to discuss technological improvements",
    logoRounded: false,
  },
];

function Exp() {
  const [visible, setVisible] = useState(null);
  const refs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      for (const id in refs.current) {
        if (refs.current[id] && !refs.current[id].contains(event.target)) {
          setVisible((prev) => (prev === id ? null : prev));
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-black text-white py-30 md:py-10 px-4 md:px-6 md:pb-40 pb-26">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-michroma-regular font-bold text-2xl md:text-4xl text-center mb-2">
          My Work Experiences
        </h1>
        <p className="text-center md:text-xl text-gray-400 mb-12">(Click the logos!)</p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative text-center">
              <img
                src={exp.logo}
                alt={exp.org}
                className={`h-32 md:h-40 cursor-pointer hover:opacity-90 transition-opacity ${
                  exp.logoRounded ? "rounded-full" : ""
                }`}
                onClick={() => setVisible(visible === exp.id ? null : exp.id)}
              />

              {visible === exp.id && (
                <motion.div
                  ref={(el) => (refs.current[exp.id] = el)}
                  initial={{ opacity: 0, y: 0, scale: 0.95 }}
                  animate={{ opacity: 1, y: 30, scale: 1 }}
                  transition={{ duration: 0.4, easing: "ease-in-out" }}
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
            </div>
          ))}
        </div>
        
        {/* Spacer to push content down when dropdown is open */}
        <AnimatePresence>
            {visible !== null && (
                <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 150 }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                />
            )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default Exp;
