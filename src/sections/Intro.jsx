"use client"

import { motion } from "motion/react"

function Intro() {
    return (
        <div className="font-michroma-regular flex flex-col md:flex-row justify-center items-center bg-black py-8 md:py-0 px-4 md:px-6 md:pb-10">
            <motion.img 
                src="./images/jeff2.jpg" 
                className="rounded-full w-48 md:w-75 mx-auto md:m-20 md:mt-10"
                alt="profpic"
                initial={{ opacity:0, scale:0.5 }}
                animate={{ opacity:1, scale: 1}}
                transition={{
                    duration: 0.8,
                    delay:0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
            />

            <div className="flex flex-col text-white place-content-center text-center md:text-left mt-8 md:mt-0 md:mr-10">
                <motion.h1
                    className="text-3xl md:text-5xl pb-4 md:pb-7"
                    animate={{ color: ["#ffffff", "#ff0000", "#ffffff"] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay:1
                    }}
                >
                    JEFFREY RITCHIE I
                </motion.h1>

                <motion.h2
                    className="text-lg md:text-xl"
                    animate={{ color: ["#ffffff", "#239ED0", "#ffffff"] }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "loop", delay: 2}}
                >
                    Computer Science Student
                </motion.h2>

                <motion.h2
                    className="text-lg md:text-xl pt-2"
                    animate={{ color: ["#ffffff", "#a855f7", "#ffffff"] }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "loop", delay: 3}}
                >
                    NYU Shanghai
                </motion.h2>
            </div>
        </div>
    );
}

export default Intro