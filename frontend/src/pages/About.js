import React from "react";
import { Container } from 'react-bootstrap'
import NavbarComponent from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";

function About() {
   return (
      <>
         <NavbarComponent />
         <Jumbotron>
            <h2 className="p-2">About us</h2>
            <h5 className="p-2 lead">Lorem ipsum dolor set init, <strong>here</strong></h5>
         </Jumbotron>
      </>
   )
}

export default About;