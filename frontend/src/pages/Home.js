import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";
import { Container, Card, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import moment from "moment"

import axios from "axios";

function Home() {
   const [data, setData] = useState([]);

   useEffect(() => {
      const fetchQuotes = async () => {
         try {
            const response = await axios.get("http://localhost:5000/api/quotes")
            console.log(response.data)
            setData(response.data)
         } catch (error) {
            console.error(error)
         }
      }
      fetchQuotes()
   }, []);

   return (
      <>
         <NavbarComponent />
         <Jumbotron>
            <h2 className="p-2">QUOTES GALLERY</h2>
            <h5 className="p-2 lead">Feeling A Little Bit Unmotivated? Get Motivated, <strong>here</strong></h5>
         </Jumbotron>

         <Container className="justify-content-center mt-5">
            <div className="p-5 border">
               {data && data.length === 0 ? (
                  <p>No quotes available, upload one <a href="/new/quote">here</a>.</p>
               ) : (
                  <div className="row">
                     {data.slice(0, 3).map((quote, index) => (
                        <div className="col mb-4" key={index}>
                           <Card className="px-5 py-4">
                              <h4>{quote.quote}</h4>
                              <div className="pt-1 d-flex justify-content-between">
                                 <i>~ {quote.postedBy}</i>
                                 <p className="opacity-50">{moment(quote.createdAt.seconds * 1000).format("MMMM Do YYYY")}</p>
                              </div>
                           </Card>
                        </div>
                     ))}
                  </div>
               )}
            </div>
            {data.length > 3 && (
               <Button variant="dark" className="w-100 mt-3">Show more</Button>
            )}
         </Container>

         <div className="newsletter bg-dark text-white mt-5 p-5">
            <div className="p-4">
               <h2 className="newsletter-title">STAY IN TOUCH</h2>
               <p>Sign up to our newsletter to get daily quotes straight to you</p>
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
