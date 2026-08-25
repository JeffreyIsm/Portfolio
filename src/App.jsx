import Intro from "./sections/Intro"
import Exp from "./sections/Experience"
import Nav from "./Nav"
import Cert from "./sections/Certifications"
import Proj from "./sections/Projects"
import Skills from "./sections/Skills"
import Contact from "./sections/Contact"
import BeamsBackground from "@/components/kokonutui/beams-background"
import { motion } from "motion/react"

function App() {

  return (
    <>
      {/* Fixed to the viewport, so it stays put while the page scrolls.
          pointer-events-none keeps it from swallowing clicks.
          The outer layer paints the dark base instantly (same neutral-950 the
          beams sit on) so only the beams fade in, with no shift in tone. */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-neutral-950">
        <motion.div
          className="h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <BeamsBackground className="h-full w-full" />
        </motion.div>
      </div>

      <div className="relative z-10">
        <Nav></Nav>
        <div className="section-anchor">
          <Intro></Intro>
        </div>
        <div id="experience" className="section-anchor">
          <Exp></Exp>
        </div>
        <div id="projects" className="section-anchor">
          <Proj></Proj>
        </div>
        <div id="skills" className="section-anchor">
          <Skills></Skills>
        </div>
        <div id="certifications" className="section-anchor">
          <Cert></Cert>
        </div>
        <div id="contact" className="section-anchor">
          <Contact></Contact>
        </div>
      </div>
    </>
  )
}

export default App
