"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Typewriter } from "../components/TypeWriter";
import { GmailIcon, InstagramIcon, LinkedinIcon } from "../components/BrandIcons";
import SocialButton from "@/components/kokonutui/social-button";

const EMAIL = "jri6773@nyu.edu";

const SOCIALS = [
    {
        icon: LinkedinIcon,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/jeffrey-ritchie-i-jri6773",
    },
    {
        icon: InstagramIcon,
        label: "Instagram",
        href: "https://www.instagram.com/",
    },
    {
        icon: GmailIcon,
        label: "Copy email address",
        copy: EMAIL,
    },
];

// navigator.clipboard needs a secure context (https / localhost). Both of ours
// qualify, but fall back rather than silently failing if it ever isn't.
async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        try {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand("copy");
            document.body.removeChild(ta);
            return ok;
        } catch {
            return false;
        }
    }
}

function Intro() {
    // null | "ok" | "fail"
    const [copyState, setCopyState] = useState(null);

    const handleShare = async (i) => {
        const item = SOCIALS[i];
        if (item.copy) {
            const ok = await copyText(item.copy);
            setCopyState(ok ? "ok" : "fail");
            setTimeout(() => setCopyState(null), 2500);
            return;
        }
        window.open(item.href, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="py-10 md:py-20 px-4 md:px-6 font-michroma-regular flex flex-col md:flex-row justify-center items-center">
            <motion.img 
                src="./images/jeff2.jpg" 
                width={1027}
                height={1316}
                fetchPriority="high"
                className="rounded-full w-48 md:w-75 h-auto mx-auto md:mx-20"
                alt="profpic"
                initial={{ opacity:0, scale:0.5 }}
                animate={{ opacity:1, scale: 1}}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
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
                        opacity: {duration:0.6, delay:1.5},
                        y: {duration:0.6, delay:2.5},
                        color:{
                            duration: 4, 
                            repeat: Infinity, 
                            repeatType: "loop", 
                            delay: 2,
                        },
                    }}
                >
                    Software Developer
                </motion.h2>

                <motion.div
                    className="dark flex flex-row justify-center md:justify-start mt-4"
                    initial={{ opacity: 0, scale: 0.5, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 2, ease: [0, 0.71, 0.2, 1.01] }}
                >
                    <SocialButton
                        label="Connect"
                        items={SOCIALS}
                        onShare={handleShare}
                    />
                </motion.div>

                {/* Fixed height so the layout doesn't jump when this appears. */}
                <div className="h-6 mt-2 text-sm text-center md:text-left" role="status" aria-live="polite">
                    <AnimatePresence>
                        {copyState && (
                            <motion.span
                                key={copyState}
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className={copyState === "ok" ? "text-green-400" : "text-white/70"}
                            >
                                {copyState === "ok" ? "Address copied" : EMAIL}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}

export default Intro