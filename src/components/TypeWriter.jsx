import { motion } from "framer-motion";

export const sentenceVariants = {
    hidden: {
        opacity:0,
    },
    // change staggerChildren variable to speed up or slow down typing.
    visible: {
        opacity: 1, 
        transition: { 
            staggerChildren: 0.08, 
        },
    },
};

export const letterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { opacity: { duration: 0 } } }
};

export const Typewriter = ({ text, ...rest }) => (
  <motion.p
    key={text}
    variants={sentenceVariants}
    initial="hidden"
    animate="visible"
    {...rest}
  >
    {text.split("").map((char, i) => (
      <motion.span key={`${char}-${i}`} variants={letterVariants}>
        {char}
      </motion.span>
    ))}
  </motion.p>
);
