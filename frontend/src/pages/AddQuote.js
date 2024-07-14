import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddQuote() {
   const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
   const [username, setUsername] = useState("");
   const navigate = useNavigate();

   useEffect(() => {
      if (isAuth) {
         const fetchUsername = async () => {
            try {
               const response = await axios.get("https://quote-generator-backend.onrender.com/api/user/details");
               setUsername(response.data.displayName)

            } catch (error) {
               console.error(`Couldn't retrieve user details: ${error.message}`)    
            }
         }
         fetchUsername()
      } else { 
         navigate("/user/login")
      }
   }, [])

   const handleSubmit = async (values, { setSubmitting }) => {
      try {
         await axios.post("https://quote-generator-backend.onrender.com/api/new/quote", {
            postedBy: username,
            quote: values.quote
         });
         navigate("/")
         setSubmitting(true)
      } catch (error) {
         console.log(`Error adding quote: ${error}`)
      } finally {
         setSubmitting(false)
      }
   }

   return (
      <>
         <NavbarComponent />
         <Jumbotron>
            <h4>Have a quote in mind?</h4>
            <p>You can express what's in your mind here</p>
         </Jumbotron>

         <Container>
            <Formik
               initialValues={{ postedBy: '', quote: '' }}
               validate={(values) => {
                  const errors = {};

                  if (!values.quote) {
                     errors.quote = "Quote required."
                  }
                  return errors
               }}
               onSubmit={handleSubmit}
            >
               {({ isSubmitting, handleChange, handleSubmit, values }) => (
                  <Form onSubmit={handleSubmit} className="m-2">
                     <Form.Group className="mt-2">
                        <Form.Label>Posted By</Form.Label>
                        <Form.Control
                           type="text"
                           className="opacity-75"
                           onChange={handleChange}
                           name="postedBy"
                           placeholder={username}
                           value={values.postedBy}
                           disabled
                           data-toggle="tooltip"
                           data-placement="top"
                           title="Don't worry about filling in this, this is your name"
                        />
                     </Form.Group>

                     <Form.Group className="my-1">
                        <Form.Label>Quote</Form.Label>
                        <Form.Control
                           as="textarea"
                           style={{ height: "150px" }}
                           type="textarea"
                           onChange={handleChange}
                           placeholder="Enter you quote"
                           name="quote"
                           value={values.quote}
                        />
                     </Form.Group>

                     <Button type="submit" className="my-2 w-25 opacity-75" variant="dark" disabled={isSubmitting}>Post</Button>
                  </Form>
               )}
            </Formik>

            {/* <ModalComponent>
               Qoute added successfully
               <Modal.Footer>
                  <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                  <Button variant="success" onClick={() => navigate("/")}>Continue</Button>
               </Modal.Footer>
            </ModalComponent> */}
         </Container>

         <Footer />
      </>
   )
}

export default AddQuote;