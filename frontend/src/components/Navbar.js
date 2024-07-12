import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function NavbarComponent() {
   const [username, setUsername] = useState(null);
   const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
   const navigate = useNavigate()

   useEffect(() => {
      if (isAuth) {
         const fetchUsername = async () => {
            try {
               const response = await axios.get("https://quote-generator-backend.onrender.com/api/user/details")
               setUsername(response.data.providerData[0].email)
               console.log(`Server response: ${response.data}`)
            } catch (err) {
               console.error(`[ERROR]: ${err}`)
            }
         }
         fetchUsername()
      }
   }, [isAuth])


   const signOutFunction = async () => {
      try {
         const response = await axios.get("https://quote-generator-backend.onrender.com/api/user/logout")

         if (response.status === 200 && response.data === "Successfully logged out") {
            navigate("/user/login")
            localStorage.removeItem("isAuth")
            setUsername(null)
         }
      } catch (err) {
         console.error(err)
      }
   }

   return (
      <>
         <Navbar expand="lg" className="bg-body-secondary">
            <Container>
               <Navbar.Brand href="/">Quotees</Navbar.Brand>

               <Navbar.Toggle className="border-0" aria-controls="nav-controller" />

               <Navbar.Collapse id="nav-controller">
                  <Nav className="me-auto justify-content-between">
                     <Nav.Link href="/">Home</Nav.Link>
                     <Nav.Link href="/pricing">Pricing</Nav.Link>
                     <Nav.Link href="/contact">Contact</Nav.Link>
                     {isAuth && (
                        <Nav.Link href="/new/quote">New-quote</Nav.Link>
                     )}
                  </Nav>
                  <hr />
                  <Nav className="ms-auto">
                     {isAuth ? (
                        <div className="d-flex justify-content-end align-items-center">
                           <Nav.Item>
                              <Nav.Link href="/" className="m-0">Signed as: <strong>{username}</strong></Nav.Link>
                           </Nav.Item>
                           <div className="vr mx-2"></div>
                           <Nav.Link href="/user/quotes">My quotes</Nav.Link>
                           <div className="vr mx-2"></div>
                           <Nav.Item>
                              <Button className="bg-secondary border-0 m-0 pe-auto" onClick={signOutFunction}>Logout</Button>
                           </Nav.Item>
                        </div>
                     ) : (
                        <>
                           <Nav.Link href="/user/register">Register</Nav.Link>
                           <Nav.Link href="/user/login">Login</Nav.Link>
                        </>
                     )}
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </>
   )
}

export default NavbarComponent;

