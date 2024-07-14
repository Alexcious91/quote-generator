import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavbarComponent from '../components/Navbar'
import Jumbotron from '../components/Jumbotron'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function MyQuotes() { //eslint-disable-next-line
   const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
   const [myQuotes, setMyQuotes] = useState([])
   const [error, setError] = useState(null)
   const [show, setShow] = useState(false) // modal
   const [quote, setQuote] = useState("") // quote fetched from database
   const [quoteId, setQuoteId] = useState(null)
   const [message, setMessage] = useState({})

   const navigate = useNavigate()

   const handleShow = (quoteId) => {
      setShow(true)
      const selectedQuote = myQuotes.find(quote => quote.id === quoteId)
      console.log(selectedQuote)
      if (selectedQuote) {
         setQuoteId(selectedQuote.id)
         setQuote(selectedQuote.quote)
      }
   };
   
   const handleClose = () => {
      console.log(message)
      setShow(false);
      setQuote(""); // Clear quote state when modal closes
      setQuoteId(null); // Clear quoteId state
      // setMessage({})
   };

   const handleDelete = async (quoteId) => {
      try {
         const response = await axios.delete(`https://quote-generator-backend.onrender.com/api/delete/quote/${quoteId}`)
         console.log("Quote deleted successfully")
         setMessage(prevMessages => ({ ...prevMessages, deleted: response.data.message })) // dont change the whole object

         setTimeout(() => {
            window.location.reload()
         }, 1500)
      } catch(error) {
         console.error(`[ERROR DELETING]: ${error}`)
      }
   }

   useEffect(() => {
      if (isAuth) {
         const fetchUserQuotes = async () => {
            try {
               const response = await axios.get("https://quote-generator-backend.onrender.com/api/user/quotes")
               if (response.status === 200) {
                  setMyQuotes(response.data.quotes)
                  setError(null)
               } else if (response.status === 401) {
                  setError("You got logged out, Please log in again.")
               }
            } catch (error) {
               if (error.response.status === 401 || error.response.status === 500) {
                  localStorage.removeItem("isAuth")
                  navigate("/user/login")
               }
               console.error(`[Error]: ${error.message}`)
            }
         }
         fetchUserQuotes()
      }
   }, [])

   const handleSubmit = async (event) => {
      event.preventDefault()
      try {
         const response = await axios.put(`https://quote-generator-backend.onrender.com/api/edit/quote/${quoteId}`, {
            quote: quote
         })
         setMessage(prevMessages => ({ ...prevMessages, edited: response.data.message }))

         handleClose() // close modal after submission
      } catch (error) {
         console.error(`[ERROR Updating]: ${error}`)
      }
   }

   return (
      <>
         <NavbarComponent />

         <Jumbotron>
            <h2 className="p-2">MY QUOTES</h2>
         </Jumbotron>

         {error && (
            <div className='text-danger text-center bg-light rounded p-3'>{error}</div>
         )}

         {message ? ( 
            <div className='text-success text-center bg-light rounded p-3'>{message.edited}</div>
         ) : (
            <div className='text-danger text-center bg-light rounded p-3'>{message.deleted}</div>
         )}

         {myQuotes.length > 0 ? (
            myQuotes.map(quote =>
               <div className='d-flex' key={quote.id}>
                  <Card className='mx-3 mt-5 w-50 p-4'>
                     <div className='d-flex justify-content-between'>
                        <h5>{quote.quote}</h5>
                        <div className='gap-3'>
                           <FaPencilAlt className='mx-2 text-primary' role='button' onClick={() => handleShow(quote.id)} />
                           <FaTrashAlt className='mx-2 text-danger' role='button' onClick={() => handleDelete(quote.id)}/>
                        </div>
                     </div>
                     <p>
                        <i>~ {quote.postedBy}</i>
                     </p>
                  </Card>
               </div>
            )
         ) : (
            <Card className='mx-5 my-4 py-5 justify-content-center'>
               <p className='text-center'>You haven't posted any quotes, post one <a href='/new/quote'>here</a></p>
            </Card>
         )}

         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Edit quote</Modal.Title>
            </Modal.Header>

            <Modal.Body>
               <Form onSubmit={handleSubmit}>
                  <Form.Control
                     onChange={(e) => setQuote(e.target.value)}
                     value={quote}
                  />

                  <Modal.Footer>
                     <Button variant='secondary' onClick={handleClose}>Cancel</Button>
                     <Button variant='primary' type='submit'>Save changes</Button>
                  </Modal.Footer>
               </Form>
            </Modal.Body>
         </Modal>
      </>
   )
}

export default MyQuotes
