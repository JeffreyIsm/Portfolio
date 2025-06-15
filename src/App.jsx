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
      <Exp></Exp>
      <Proj></Proj>
      <Cert></Cert>
      <Skills></Skills>
    </>
  )
}

export default App
