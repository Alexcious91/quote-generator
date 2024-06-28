import React, { useState } from 'react';
import { Formik } from 'formik';
import { Form, Button, Card } from 'react-bootstrap';
import ModalComponent from '../components/Modal';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function Register() {
   const [showModal, setShowModal] = useState(false);

   const navigate = useNavigate();

   const handleSubmit = async (values, { setSubmitting }) => {
      try {
         const response = await axios.post("http://localhost:5000/api/user/register", {
            username: values.username,
            email: values.email,
            password: values.password
         });
         console.log("Server response:", response.data); // Log server response
         navigate("/user/login");
      } catch (error) {
         console.error("Error creating account:", error);
         setSubmitting(false)
      } finally {
         setSubmitting(false);
      }
   };

   return (
      <>
         <NavbarComponent />
         <Card className='p-4 m-4 border-0 rounded mx-5'>
            <Card.Header className='border'>
               <h4 className='text-center py-2'>Register</h4>
               <p className='text-muted text-center'>Fill out the form below</p>
            </Card.Header>
            <Formik
               initialValues={{ username: '', email: '', password: '' }}
               validate={values => {
                  const errors = {};
                  if (!values.username) {
                     errors.username = "Username required";
                  }

                  if (!values.email) {
                     errors.email = "Email required";
                  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                     errors.email = "Invalid email address";
                  }

                  if (!values.password) {
                     errors.password = "Password required";
                  }
                  return errors;
               }}
               onSubmit={handleSubmit}
            >
               {({ isSubmitting, handleSubmit, handleChange, values, errors }) => (
                  <Form onSubmit={handleSubmit} className='mx-5'>
                     <Form.Group className='py-1'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                           type='text'
                           placeholder='Enter username'
                           onChange={handleChange}
                           value={values.username}
                           name='username'
                        />
                        {errors.username && (
                           <p className='bg-danger opacity-2 rounded p-2'>{errors.username}</p>
                        )}
                     </Form.Group>

                     <Form.Group className='py-1'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                           type='email'
                           placeholder='Enter email'
                           onChange={handleChange}
                           value={values.email}
                           name='email'
                        />
                        {errors.email && (
                           <p className='bg-danger rounded p-2'>{errors.email}</p>
                        )}
                     </Form.Group>

                     <Form.Group className='py-1'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                           type='password'
                           placeholder='Enter password'
                           onChange={handleChange}
                           value={values.password}
                           name='password'
                        />
                        {errors.password && (
                           <p className='bg-danger rounded p-2'>{errors.password}</p>
                        )}
                     </Form.Group>
                     <Button variant='success' type='submit' className='mt-3 w-100' disabled={isSubmitting}>Register</Button>
                     <p className='justify-content-end my-2 text-muted text-center'>Already have an account? <a href='/user/login' className='text-danger'>Login</a></p>
                  </Form>
               )}
            </Formik>
         </Card>

         {/* Show modal on submitting */}
         <ModalComponent show={showModal} onHide={() => setShowModal(false)}>
            Data submitted successfully. You'll be redirected to login
         </ModalComponent>

         <Footer />
      </>
   );
}

export default Register;
