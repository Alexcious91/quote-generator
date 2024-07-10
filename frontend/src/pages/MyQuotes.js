import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavbarComponent from '../components/Navbar'
import Jumbotron from '../components/Jumbotron'
import { Card } from 'react-bootstrap'

function MyQuotes() {
   const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
   const [myQuotes, setMyQuotes] = useState([])

   useEffect(() => {
      if (isAuth) {
         const fetchUserQuotes = async () => {
            try {
               const response = await axios.get("https://quote-generator-backend.onrender.com/api/user/quotes")
               console.log(response.data)
               setMyQuotes(response.data)
            } catch (error) {
               console.error(`Error fetching quotes: ${error.message}`)
            }
         }
         fetchUserQuotes()
      }
   })

   return (
      <>
         <NavbarComponent />

         <Jumbotron>
            <h2 className="p-2">MY QUOTES</h2>
         </Jumbotron>

         {myQuotes.length > 0 ? (
            myQuotes.map(quote =>
               <div className='d-flex' key={quote.id}>
                  <Card className='mx-4 mt-5 w-50 p-4'>
                     <h5>{quote.quote}</h5>
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
      </>
   )
}

export default MyQuotes
