import React from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { TiSocialFacebook, TiSocialGithub, TiSocialTwitter, TiSocialYoutube } from "react-icons/ti";
import { MdEmail } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";

function Footer() {
   return (
      <Navbar expand="lg" className='text-center text-lg-start mt-5 bg-light text-muted'>
         <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
            <div className='me-5 d-none d-lg-block'>
               <span>Get connected with us on social networks:</span>
            </div>

            <div>
               <a href='https://facebook.com' className='me-4 text-reset'>
                  <TiSocialFacebook className="fs-2 text-primary"/>
               </a>
               <a href='https://github.com' className='me-4 text-reset'>
                  <TiSocialGithub className="fs-2"/>
               </a>
               <a href='https://youtube.com' className='me-4 text-reset'>
                  <TiSocialYoutube className="fs-2 text-danger"/>
               </a>
               <a href='https://twitter.com' className='me-4 text-reset'>
                  <TiSocialTwitter className="fs-2 text-primary"/>
               </a>
            </div>
         </section>

         <section className=''>
            <Container className='text-center text-md-start mt-5'>
               <Row className='mt-3'>
                  <Col md="3" lg="4" xl="3" className='mx-auto mb-4'>
                     <h6 className='text-uppercase mb-4'>
                        {/* <Icon icon="gem" className="me-3" /> */}
                        Quotees
                     </h6>
                     <p>
                     Join us on a journey through the mind of the quote generator and let us inspire and innovate together. 
                     </p>
                  </Col>

                  <Col md="3" lg="2" xl="2" className='mx-auto mb-4'>
                     <h6 className='text-uppercase mb-4'>Useful links</h6>
                     <p>
                        <a href="/about" className="text-reset">About</a>
                     </p>

                     <p>
                        <a href="/pricing" className="text-reset">Pricing</a>
                     </p>

                     <p>
                        <a href="/contact" className="text-reset">Contact</a>
                     </p>
                  </Col>

                  <Col md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                     <h6 className='text-uppercase mb-4'>Contact</h6>

                     <p>
                        <MdEmail className="text-primary fs-5"/> quotees@gmail.com
                     </p>

                     <p>
                        <BsWhatsapp className="text-success fs-5"/> +27 12 345 6789
                     </p>
                  </Col>
               </Row>
            </Container>
         </section>
{/* 
         <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
            © 2021 Copyright:
            <a className='text-reset' href='https://mdbootstrap.com/'>
               MDBootstrap.com
            </a>
         </div> */}
      </Navbar>
   )
}

export default Footer;
