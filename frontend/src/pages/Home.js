import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";
import { Container, Card, Button, Form } from "react-bootstrap";
import Footer from "../components/Footer";

import axios from "axios";

function Home() {
   const [data, setData] = useState([]);
   const [currentQuote, setCurrentQuote] = useState(0);

   useEffect(() => {
      const fetchQuotes = async () => {
         try {
            const response = await axios.get("https://quote-generator-backend.onrender.com/api/quotes")
            // console.log(response.data)
            setData(response.data)
         } catch (error) {
            console.error(error)
         }
      }
      fetchQuotes()
   }, []);

   const handleNextQuote = () => {
      if (data.length > 0) {
         setCurrentQuote((prevIndex) => (prevIndex + 1) % data.length);
      }
   };

   return (
      <>
         <NavbarComponent />
         <Jumbotron>
            <h2 className="p-2">QUOTE GENERATOR</h2>
            <h5 className="p-2 lead">Feeling A Little Bit Unmotivated? Get Motivated, <strong>here</strong></h5>
         </Jumbotron>

         <Container className="justify-content-center mt-5">
            <Card className="p-5">
               {data && data.length === 0 ? (
                  <p>No quotes available, upload one <a href="/new/quote">here</a>.</p>
               ) : (
                  <div key={currentQuote}>
                     <h4>{data[currentQuote].quote}</h4>
                     <i>~{data[currentQuote].author}</i>
                  </div>
               )}
            </Card>
            {data.length > 0 && (
               <Button variant="dark" className="w-100 mt-3" onClick={handleNextQuote}>
                  Generate
               </Button>
            )}
         </Container>

         <div className="newsletter bg-dark text-white mt-5 p-5">
            <div className="p-4">
               <h2 className="newsletter-title">STAY IN TOUCH</h2>
               <div className="input-group col-sm-4 col-md-4 col-lg-8">
                  <input className="form-control fs-6 w-25 rounded-0" placeholder="Enter your e-mail address" />
                  <div className="mb-0 input-group-append align-items-center">
                     <Button className="mb-0 py-2 rounded-0">SUBMIT</Button>
                  </div>
               </div>
            </div>
         </div>

         {/* <Container>
            <Card className="border-start border-primary m-5 p-4">
               <h3 className="text-muted">How it works</h3>

               <div>
                  <h5><strong>Create account</strong></h5>
               </div>
            </Card>
         </Container> */}
         <Footer />
      </>
   );
}

export default Home;
