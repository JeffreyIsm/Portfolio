"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import ExperienceCard from "../components/ExperienceCard";

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
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    
    const handleClickOutside = (event) => {
      if (visible && !event.target.closest('.experience-card')) {
        setVisible(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isHydrated, visible]);

  if (!isHydrated) {
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
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white py-30 md:py-10 px-4 md:px-6 md:pb-40 pb-26">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-michroma-regular font-bold text-2xl md:text-4xl text-center mb-2">
          My Work Experiences
        </h1>
        <p className="text-center md:text-xl text-gray-400 mb-12">(Click the logos!)</p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20">
          {experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              isVisible={visible === exp.id}
              onToggle={() => setVisible(visible === exp.id ? null : exp.id)}
              className="experience-card"
            />
          ))}
        </div>
        
        <AnimatePresence>
          {visible !== null && (
            <motion.div 
              layout
              initial={{ height: 0 }}
              animate={{ height: 150 }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Exp;
