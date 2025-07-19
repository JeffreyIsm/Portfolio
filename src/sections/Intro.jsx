"use client"

import { motion } from "motion/react"
import { Typewriter } from "../components/TypeWriter";
import { AnimatedLogo } from "../components/AnimatedLogo";

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
                    delay:1.75,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
            />

            <div className="flex flex-col text-white place-content-center text-center md:text-left mt-8 md:mt-0 md:mr-10">
                <motion.h1
                    className="text-3xl font-bold md:text-5xl pb-4 md:pb-7"
                    animate={{ color: ["#ffffff", "#ff0000", "#ffffff"] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay:1.5
                    }}
                > <Typewriter text="JEFFREY RITCHIE I"/>
                </motion.h1>

                <motion.h2
                    className="text-lg md:text-xl"
                    initial={{opacity:0, y:10}}
                    animate={{ 
                        opacity:1,
                        y:0,
                        color: ["#ffffff", "#239ED0", "#ffffff"], 
                    }}
                    transition={{ 
                        opacity: {duration:0.6, delay:2.5},
                        y: {duration:0.6, delay:2.5},
                        color:{
                            duration: 4, 
                            repeat: Infinity, 
                            repeatType: "loop", 
                            delay: 2,
                        },
                    }}
                >
                    Computer Science Student
                </motion.h2>

                <motion.h2
                    className="text-lg md:text-xl"
                    initial={{opacity:0, y:-10}}
                    animate={{ 
                        opacity:1,
                        y:0,
                        color: ["#ffffff", "#a855f7", "#ffffff"], 
                    }}
                    transition={{ 
                        opacity: {duration:0.6, delay:2.5},
                        y: {duration:0.6, delay:2.5},
                        color:{
                            duration: 4, 
                            repeat: Infinity, 
                            repeatType: "loop", 
                            delay: 2,
                        },
                    }}
                >
                    NYU Shanghai
                </motion.h2>

                <div className="flex flex-row justify-center md:justify-start gap-4 mt-4">
                    <AnimatedLogo
                        href="mailto:jri6773@nyu.edu?subject=Hello Jeffrey"
                        imgSrc="./images/gmail.png"
                        alt="Gmail"
                        delay={3}
                    />
                    <AnimatedLogo
                        href="https://www.linkedin.com/in/jeffrey-ritchie-i-jri6773"
                        imgSrc="./images/linkedin.png"
                        alt="LinkedIn"
                        delay={3.2}
                    />
                    <AnimatedLogo
                        href="https://github.com/JeffreyIsm"
                        imgSrc="./images/github.png"
                        alt="GitHub"
                        delay={3.4}
                    />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 7.2 }}
                    className="text-white text-xs mt-3 text-center md:text-left"
                >
                    jri6773@nyu.edu
                </motion.div>
            </div>
        </div>
    );
}

export default Intro