import Intro from "./sections/Intro"
import Exp from "./sections/Experience"
import Nav from "./Nav"
import Cert from "./sections/Certifications"
import Proj from "./sections/Projects"
import Skills from "./sections/Skills"

function App() {

  return (
    <>
      <Nav></Nav>
      <Intro></Intro>
      <div id="experience">
        <Exp></Exp>
      </div>
      <div id="projects">
        <Proj></Proj>
      </div>
      <div id="skills">
        <Skills></Skills>
      </div>
      <div id="certifications">
        <Cert></Cert>
      </div>
    </>
  )
}

export default App
