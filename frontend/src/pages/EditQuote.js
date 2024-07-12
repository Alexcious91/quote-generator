import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";
import axios from "axios";

function EditQoute() {
   const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
   const [username, setUsername] = useState(null)
   const [quote, setQuote] = useState(null)

   useEffect(() => {
      if (isAuth) {
         const fetchUsername = async () => {
            try {
               const response = await axios.get("http://localhost:5000/api/user/details");
               setUsername(response.data.displayName)

            } catch (error) {
               console.error(`Couldn't retrieve user details: ${error.message}`)
            }
         }
         fetchUsername()
      }
   })

   const handleSubmit = async (values, { setSubmitting }) => {
      try {
         const postQuotes = axios.post("http://localhost:5000/edit/quote", {
            postedBy: username,
            quote: values.quote
         })
      } catch (error) {
         console.error(`Error editing quote: ${error}`)
      } finally {
         setSubmitting(false)
      }
   }

   return (
      <>
         <NavbarComponent />

         <Jumbotron>
            <h2 className="p-2">Edit Quote</h2>
         </Jumbotron>
      </>
   )
}

export default EditQoute;