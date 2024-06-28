import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';

function ModalComponent({ children }) {
   const [show, setShow] = useState(false)

   const handleClose = () => {
      setShow(false);
   }

   const handleShow = () => {
      setShow(true);
   }

   return (
      <>
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />

            <Modal.Body>{children}</Modal.Body>

            
         </Modal>
      </>
   )
}

export default ModalComponent;