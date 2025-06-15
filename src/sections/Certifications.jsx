"use client"

import * as motion from "motion/react-client"

export default function Cert() {
  return (
    <div className="bg-black w-full py-12 md:py-15 px-4 md:px-6 md:pb-50">
      <div className="max-w-7xl mx-auto">
        {/* Container for title and content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left Title */}
          <div className="md:w-1/3">
            <div className="md:sticky md:top-32 text-center md:text-left md:ml-15">
              <h2 className="font-michroma-regular text-2xl md:text-3xl font-bold text-white leading-12">
                Certificates / Courses
              </h2>
            </div>
          </div>

          {/* Right Scroll Section */}
          <div className="md:w-2/3 md:ml-5">
            <div className="space-y-16 md:space-y-32">
              {certificates.map(([certs], i) => (
                <Card i={i} certs={certs} key={certs} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* a new component for EACH INDIVIDUAL image card */
function Card({ certs, i }) {
  return (
    <motion.div
      className="flex justify-center items-center relative"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.9 }}
    >
      <motion.div 
        variants={cardVariants}
        className="w-full"
      >
        <img 
          src={certs} 
          alt="certificate" 
          className="w-full max-w-[600px] mx-auto object-contain"
        />
      </motion.div>
    </motion.div>
  );
}

const cardVariants ={
  offscreen: {
    y: 0,
  },
  onscreen: {
    y: 0,
    transition: {
      type:"linear",
      duration:0.8,
    },
  },
};

const certificates = [
  ["../images/mlcert.jpg"],
  ["../images/pythoncert.jpg"],
]