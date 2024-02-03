import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from './Components/NavBar.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Banner} from './Components/Banner.jsx';
import {Skills} from './Components/Skills.jsx';
import {Projects} from './Components/Projects.jsx';
import {Contact} from './Components/Contact.jsx';
import {Footer} from './Components/Footer.jsx';
import {Proj1} from './Pages/Proj1.jsx';
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={
          <>
            <NavBar />
            <Banner/>
            <Skills/>
            <Projects/>
            <Contact/>
            <Footer/>
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
    </BrowserRouter>
  );
}

export default App
