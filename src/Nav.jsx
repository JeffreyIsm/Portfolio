import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"

// When the Intro has finished landing. Its last finite entrance is the <h2>'s
// y transition (delay 2.5 + duration 0.6); the typewriter, portrait and social
// buttons all settle earlier. Bump this if those timings change.
const INTRO_SETTLES = 3.1;

function Nav(){
    const [isOpen, setIsOpen] = useState(false);
    const reduceMotion = useReducedMotion();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false); // Close mobile menu after clicking
        }
    };

    return(
        <motion.div
            initial={{ y: reduceMotion ? 0 : -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                duration: reduceMotion ? 0 : 0.6,
                delay: reduceMotion ? 0 : INTRO_SETTLES + 0.1,
                ease: "easeOut",
            }}
            className="font-michroma-regular text-white pt-7 pb-10 px-4 sticky top-0 z-50"
        >
            <nav className="w-[90vw] md:w-[70vw] mx-auto rounded-lg px-6 py-3 border border-white/20 hover:border-white/40 transition-all bg-black/40 backdrop-blur-md">
            <div className="flex flex-row justify-between items-center">
                <div className="hover-red cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <p>JR</p>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex flex-row space-x-6">
                    <p className="hover-red cursor-pointer" onClick={() => scrollToSection('experience')}>experiences</p>
                    <p className="hover-red cursor-pointer" onClick={() => scrollToSection('projects')}>projects</p>
                    <p className="hover-red cursor-pointer" onClick={() => scrollToSection('skills')}>skills</p>
                    <p className="hover-red cursor-pointer" onClick={() => scrollToSection('certifications')}>certificates</p>
                    <p className="hover-red cursor-pointer" onClick={() => scrollToSection('contact')}>contact</p>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="hover-red cursor-pointer text-white focus:outline-none"
                    >
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M6 18L18 6M6 6l12 12" 
                                />
                            ) : (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4 6h16M4 12h16M4 18h16" 
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden mt-4 space-y-4">
                    <p className="hover-red cursor-pointer" onClick={() => scrollToSection('experience')}>experience</p>
                    <p className="hover-red cursor-pointer" onClick={() => scrollToSection('projects')}>projects</p>
                    <p className="hover-red cursor-pointer" onClick={() => scrollToSection('certifications')}>certifications</p>
                    <p className="hover-red cursor-pointer" onClick={() => scrollToSection('skills')}>skills</p>
                    <p className="hover-red cursor-pointer" onClick={() => scrollToSection('contact')}>contact</p>
                </div>
            )}
            </nav>
        </motion.div>
    );
}

export default Nav