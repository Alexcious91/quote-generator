import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Container, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddQuote() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

   const handleSubmit = async (values, { setSubmitting }) => {
      try {
         await axios.post("https://quote-generator-backend.onrender.com/api/new/quote", {
            author: values.author,
            quote: values.quote
         });
         navigate("/")
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
               initialValues={{ author: '', quote: '' }}
               validate={(values) => {
                  const errors = {};

                  if (!values.author) {
                     errors.author = "Author required."
                  } else if (!values.quote) {
                     errors.quote = "Quote required."
                  } else if (values.quote.length < 10) {
                     errors.quote = "Qoute is too short"
                  }
                  return errors
               }}
               onSubmit={handleSubmit}
            >
               {({ isSubmitting, handleChange, handleSubmit, values }) => (
                  <Form onSubmit={handleSubmit} className="m-2">
                     <Form.Group className="my-1">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                           type="text"
                           onChange={handleChange}
                           placeholder="Enter your quote"
                           name="author"
                           value={values.author}
                           // disabled
                           // data-toggle="tooltip"
                           // data-placement="top"
                           // title="Author name will your username, don't worry filling in this"
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