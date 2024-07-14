import React, { useState } from 'react';
import { Formik } from 'formik';
import { Form, Button, Card } from 'react-bootstrap';
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   // login with email and password
   const handleFormSubmit = async (values, { setSubmitting }) => {
      try {
         const response = await axios.post("http://localhost:5000/api/user/login", {
            email: values.email, 
            password: values.password
         })
         
         if (response.status === 200) {
            localStorage.setItem("isAuth", true)
            navigate("/")
         }
      } catch (error) {
         setError("Couldn't sign in user. Please check your credentials.")
      } finally {
         setSubmitting(false)
      }
   }

   return (
      <>
         <NavbarComponent />
         <Card className='p-4 m-4 border-0 mx-5'>
            <Card.Header className='border'>
               <h4 className='text-center py-2'>Login</h4>
               <p className='text-muted text-center'>Fill out the form below</p>
            </Card.Header>
            <Formik
               initialValues={{ email: '', password: '' }}
               validate={values => {
                  const errors = {};
                  if (!values.email) {
                     errors.email = "Email required";
                  } else if (!values.password) {
                     errors.password = "Password required";
                  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                     errors.email = "Invalid email address";
                  } else if (values.email.includes(" ")) {
                     errors.email = "Email can't contain spaces"
                  }
                  return errors;
               }}
               onSubmit={handleFormSubmit}
            >
               {({ isSubmitting, handleSubmit, handleChange, values, errors }) => (
                  <Form onSubmit={handleSubmit}>
                     {error && (
                        <p className='text-danger bg-light text-center rounded p-2'>{error}</p>
                     )}
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
                           <p className='text-danger rounded p-2 m-0'>{errors.email}</p>
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
                           <p className='text-danger rounded p-2 m-0'>{errors.password}</p>
                        )}
                     </Form.Group>
                     <Button variant='success' type='submit' className='mt-3 w-100' disabled={isSubmitting}>Login</Button>
                     <p className='justify-content-end my-2 text-center'>Don't have an account? <a href='/user/register' className='text-danger'>Register</a></p>
                  </Form>
               )}
            </Formik>
         </Card>
         <Footer />
      </>
   );
}

export default Login;
