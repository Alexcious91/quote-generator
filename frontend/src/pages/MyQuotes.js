import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavbarComponent from '../components/Navbar'
import Jumbotron from '../components/Jumbotron'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'

function MyQuotes() { //eslint-disable-next-line
   const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
   const [myQuotes, setMyQuotes] = useState([])
   const [error, setError] = useState(null)
   const [show, setShow] = useState(false) // modal
   const [quote, setQuote] = useState("") // quote fetched from database
   const [quoteId, setQuoteId] = useState(null)

   const handleShow = (quoteId) => {
      setShow(true)
      const selectedQuote = myQuotes.find(quote => quote.id === quoteId)
      console.log(selectedQuote)
      setQuoteId(selectedQuote)
      setQuote(selectedQuote.quote.toString())
   };

   const handleClose = () => {
      setShow(false);
      setQuote(""); // Clear quote state when modal closes
      setQuoteId(null); // Clear quoteId state
   };

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
               console.error(`[Error]: ${error.message}`)
            }
         }
         fetchUserQuotes()
      }
   }, [])

   const handleSubmit = async () => {
      try {
         await axios.post(`https://quote-generator-backend.onrender.com/api/edit/quote/${quoteId}`, {
            quote: quote
         })
         const updatedQuotes = myQuotes.map(singleQuote => singleQuote.id === quoteId ? { ...singleQuote, quote: quote } : singleQuote )
         setMyQuotes(updatedQuotes)
         handleClose()
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
            <div className='text-danger text-center bg-light rounded p-2'>{error}</div>
         )}

         {myQuotes.length > 0 ? (
            myQuotes.map(quote =>
               <div className='d-flex' key={quote.id}>
                  <Card className='mx-4 mt-5 w-50 p-4'>
                     <div className='d-flex justify-content-between'>
                        <h5>{quote.quote}</h5>
                        <div className='gap-3'>
                           <FaPencilAlt className='mx-2 text-primary' role='button' onClick={() => handleShow(quote.id)} />
                           <FaTrashAlt className='mx-2 text-danger' role='button' />
                        </div>
                     </div>
                     <p>
                        <i>~{quote.postedBy}</i>
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
                     placeholder={quote}
                  />
               </Form>
            </Modal.Body>

            <Modal.Footer>
               <Button variant='secondary' onClick={handleClose}>Cancel</Button>
               <Button variant='primary' type='submit' onClick={handleShow}>Save changes</Button>
            </Modal.Footer>
         </Modal>
      </>
   )
}

export default MyQuotes
