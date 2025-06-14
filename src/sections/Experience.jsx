"use client"

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";

function Exp() {
    const [showRobotics, setShowRobotics] = useState(false);
    const [showBCA, setShowBCA] = useState(false);
    const roboticsRef = useRef(null);
    const bcaRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (roboticsRef.current && !roboticsRef.current.contains(event.target)) {
                setShowRobotics(false);
            }
            if (bcaRef.current && !bcaRef.current.contains(event.target)) {
                setShowBCA(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showRobotics, showBCA]);

    return (
        <div className="bg-black text-white py-8 md:py-0 px-4 md:px-6 md:pb-40 pb-26">
            <div className="max-w-7xl mx-auto">
                <h1 className="font-michroma-regular font-bold text-2xl md:text-4xl text-center md:text-center mb-2">My Work Experiences</h1>
                <p className="text-center md:text-xl md:text-center text-gray-400 mb-12">(Click the logos!)</p>
                
                <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-20">
                    {/* Robotics Image */}
                    <div className="relative text-center">
                        <img 
                            src="./images/robotics.jpeg" 
                            className="rounded-full h-32 md:h-40 cursor-pointer hover:opacity-90 transition-opacity" 
                            alt="Robotics" 
                            onClick={() => setShowRobotics(!showRobotics)}
                        />

                        {showRobotics && (
                            <motion.div 
                                ref={roboticsRef}
                                initial={{ opacity: 0, y: 0, scale: 0.95 }}
                                animate={{ opacity: 1, y: 30, scale: 1 }}
                                transition={{ duration: 0.4, easing: 'ease-in-out' }}
                                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[90vw] md:w-[600px] bg-gray-900 p-4 rounded-xl shadow-lg z-10 text-left space-y-3"
                            >
                                <div className="flex flex-col md:flex-row gap-4">
                                    <img
                                        src="./images/robots_team.jpg"
                                        className="h-40 w-full md:w-80 object-cover rounded"
                                        alt="Robotics Detail"
                                    />
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-xl font-semibold">Board Member</h3>
                                        <h4 className="text-sm text-gray-300">Robotics Club at NYU Shanghai</h4>
                                        <h5 className="text-sm text-gray-400">Sep 2024 - Present</h5>
                                        <h5 className="text-sm text-gray-400">Shanghai, China (On-site)</h5>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-200">
                                    Together with the core team: Developed the NYU Shanghai Robotics website, designed,
                                    built, and competed in the Asia Open VEX-U Robotics Competition. Learned how to
                                    integrate code with robotic hardware.
                                </p>
                            </motion.div>
                        )}
                    </div>  

                    {/* BCA Image */}
                    <div className="relative text-center">
                        <img 
                            src="./images/bca.jpg" 
                            className="h-32 md:h-40 cursor-pointer hover:opacity-90 transition-opacity" 
                            alt="BCA" 
                            onClick={() => setShowBCA(!showBCA)}
                        />

                        {showBCA && (
                            <motion.div 
                                ref={bcaRef}
                                initial={{ opacity: 0, y: 0, scale: 0.95 }}
                                animate={{ opacity: 1, y: 30, scale: 1 }}
                                transition={{ duration: 0.4, easing: 'ease-in-out' }}
                                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-[90vw] md:w-[600px] bg-gray-900 p-4 rounded-xl shadow-lg z-10 text-left space-y-3"
                            >
                                <div className="flex flex-col md:flex-row gap-4">
                                    <img
                                        src="./images/bcaintern.jpg"
                                        className="h-40 w-full md:w-80 object-cover rounded"
                                        alt="BCA Detail"
                                    />
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-xl font-semibold">Information Technology Business Analyst</h3>
                                        <h4 className="text-sm text-gray-300">Internship - Bank Central Asia (BCA)</h4>
                                        <h5 className="text-sm text-gray-400">Dec 2022 - Jan 2023</h5>
                                        <h5 className="text-sm text-gray-400">Jakarta, Indonesia (On-site)</h5>
                                    </div>
                                </div>
                                <p className="text-white">
                                    Researched security & Customer service,
                                    Joined meetings to discuss technological improvements
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Exp