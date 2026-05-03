"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const experiences = [
  {
    id: "xsigma",
    logo: "./images/xsigma_logo.jpg",
    image: "./images/xsigma_team.jpeg",
    title: "Software Developer Intern",
    org: "X-Sigma Partners (Shanghai)",
    date: "Nov 2025 - Apr 2026",
    location: "Shanghai, China (On-site)",
    description: [
      "Replaced manual Excel workflows by designing and implementing a full-stack ERP system for production and inventory management, integrating automated calculations to improve efficiency and data accuracy.",
      "Worked directly with company leadership to align system design with business operations and strategic decisions.",
      "Integrated API-level caching and pagination, and implemented JWT role-based authentication (RBAC), ensuring scalable, cost-efficient, and secure performance.",
      "Containerized the system using Docker and deployed it on Aliyun with RDS for production use.",
      "Automated repetitive tasks using Python and Playwright to improve workflow efficiency."
    ],
    logoRounded: false,
  },
  {
    id: "bca",
    logo: "./images/bca.jpg",
    image: "./images/bcaintern.jpg",
    title: "Information Technology Business Analyst",
    org: "Internship - Bank Central Asia (BCA)",
    date: "Dec 2022 - Jan 2023",
    location: "Jakarta, Indonesia (On-site)",
    description: [
      "Researched security & Customer service.",
      "Joined meetings to discuss technological improvements."
    ],
    logoRounded: false,
  },
  {
    id: "robotics",
    logo: "./images/robotics.jpeg",
    image: "./images/robots_team.jpg",
    title: "Board Member",
    org: "Robotics Club at NYU Shanghai",
    date: "Sep 2024 - Present",
    location: "Shanghai, China (On-site)",
    description: [
      "Together with the core team: Developed the NYU Shanghai Robotics website.",
      "Designed, built, and competed in the Asia Open VEX-U Robotics Competition.",
      "Learned how to integrate code with robotic hardware."
    ],
    logoRounded: true,
  },
];

function Exp() {
  const [visible, setVisible] = useState(null);
  const refs = useRef({});

  useEffect(() => {
    // Preload all experience detail images
    experiences.forEach((exp) => {
      const img = new Image();
      img.src = exp.image;
    });

    const handleClickOutside = (event) => {
      // If clicking outside the active card container, close it
      if (visible && refs.current[visible] && !refs.current[visible].contains(event.target)) {
        setVisible(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible]);

  return (
    <div className="bg-black text-white py-10 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-michroma-regular font-bold text-2xl md:text-4xl text-center mb-2">
          My Work Experiences
        </h1>
        <p className="text-center md:text-xl text-gray-400 mb-12">(Click the logos!)</p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20 mb-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="text-center">
              <img
                src={exp.logo}
                alt={exp.org}
                className={`h-32 md:h-40 cursor-pointer hover:opacity-90 transition-opacity ${
                  exp.logoRounded ? "rounded-full" : "rounded-2xl"
                } ${visible === exp.id ? "ring-4 ring-white/20" : ""}`}
                onClick={() => setVisible(visible === exp.id ? null : exp.id)}
              />
            </div>
          ))}
        </div>

        <div className="relative min-h-[50px]">
          <AnimatePresence mode="wait">
            {visible && (
              <motion.div
                key={visible}
                ref={(el) => (refs.current[visible] = el)}
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: 20, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm"
              >
                {experiences.find(e => e.id === visible) && (
                  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <div className="w-full lg:w-1/2">
                      <img
                        src={experiences.find(e => e.id === visible).image}
                        className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
                        alt={experiences.find(e => e.id === visible).title}
                      />
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                          {experiences.find(e => e.id === visible).title}
                        </h3>
                        <p className="text-lg text-indigo-400 font-semibold">
                          {experiences.find(e => e.id === visible).org}
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-400">
                        <span className="flex items-center gap-2">
                          📅 {experiences.find(e => e.id === visible).date}
                        </span>
                        <span className="flex items-center gap-2">
                          📍 {experiences.find(e => e.id === visible).location}
                        </span>
                      </div>

                      <ul className="space-y-3 pt-4 border-t border-white/10">
                        {experiences.find(e => e.id === visible).description.map((bullet, idx) => (
                          <li key={idx} className="flex gap-3 text-gray-200 text-sm md:text-base leading-relaxed">
                            <span className="text-indigo-500 mt-1.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Exp;
