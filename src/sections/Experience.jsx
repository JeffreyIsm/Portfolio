"use client";

import { useState } from "react";
import { experiences } from "../data/experiences";
import ExperienceWheel from "../components/experience/ExperienceWheel";
import ExperienceDetails from "../components/experience/ExperienceDetails";

function Exp() {
  const [index, setIndex] = useState(0);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="My work experiences"
      className="text-white py-10 md:py-20 px-4 md:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          <div className="w-full lg:w-[45%] flex flex-col items-center gap-8">
            <h1 className="font-michroma-regular font-bold text-[clamp(1.5rem,2.6vw,2.25rem)] text-center">
              My Experiences
            </h1>

            <ExperienceWheel
              experiences={experiences}
              index={index}
              onIndexChange={setIndex}
            />
          </div>

          <div className="w-full lg:w-[55%]">
            <ExperienceDetails experiences={experiences} index={index} />
          </div>
        </div>

        {/* Announced to screen readers on every change, since the visual cue is
            position + scale. */}
        <p className="sr-only" aria-live="polite">
          {experiences[index].name}, {experiences[index].role}, {experiences[index].year}
        </p>
      </div>
    </section>
  );
}

export default Exp;
