import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './Components/NavBar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Banner } from './Components/Banner.jsx';
import { About } from './Components/About.jsx';
import { Skills } from './Components/Skills.jsx';
import { Projects } from './Components/Projects.jsx';
import { Experience } from './Components/Experience.jsx';
import { Contact } from './Components/Contact.jsx';
import { FAQ } from './Components/FAQ.jsx';
import { Footer } from './Components/Footer.jsx';
import { Proj1 } from './Pages/Proj1.jsx';
import { ThemeProvider } from './ThemeContext.jsx';
import { CookieConsent } from './Components/CookieConsent.jsx';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={
            <>
              <NavBar />
              <Banner />
              <About />
              <Experience />
              <Projects />
              <Skills />
              <Contact />
              <FAQ />
            </>
          }>

          </Route>

          <Route path="/proj1" element={
            <Proj1 />}
          >
          </Route>

          {/* <Route path="/proj2">
            <Proj2 />
          </Route> */}

        </Routes>
        <Footer />
        <CookieConsent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
