import { Modal, Button, Alert} from 'react-bootstrap';
import React, {useContext, useEffect, useState } from 'react';
import {MessageContext} from './context/MessageContext';
import Message from './message';
import AddForm from './AddForm';
import Pagination from './Pagination';


const Messages = () =>
{  
  const {sortedMessages} = useContext(MessageContext);

  const [showAlert, setShowAlert] = useState(false);

  const [show, setShow] = useState(false);
  
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  //const handleShowAlert = () =>setShowAlert(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(2)

  const handleShowAlert = () => {
      setShowAlert(true);
      setTimeout(()=> {
          setShowAlert(false);
      }, 2000)
  }

  useEffect(() => {
      handleClose();

      return () => {
          handleShowAlert();
      }
  }, [sortedMessages])

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = sortedMessages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPagesNum = Math.ceil(sortedMessages.length / messagesPerPage);

      return(
        <div className="innerbox">
         <div className="bg table-title">
          <h1>Dead Ringer | Messages</h1>
          <p>
            Create and modify custom messages to send to your recipients in the event that your dead man switch is triggered. 
            Remember to assign your messages to the proper recipients in the settings tab once you are satisfied with your messages. 
          </p>

          <Alert show={showAlert} variant="success">
            Messages Updated Succefully!
          </Alert>

          <div className="messages container">
          
              <table className="table table-striped table-hover">
              <tbody>
              {
                currentMessages.map(message => (
                <tr key={message.id}>
                  <Message message={message} />
                </tr>
                ))  
             }
             </tbody>
            </table>

            <div>
                <button onClick={handleShow} className="btn btn-success mt-3 mb-4" data-toggle="modal"><span>Create New Message</span></button>					
            </div>

            <Pagination pages = {totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentMessages ={currentMessages}
                sortedMessages = {sortedMessages} />
            </div>
        </div>
          
         

              

                <Modal show={show} onHide={handleClose}>
                 <Modal.Header closeButton>
                   <Modal.Title>
                     Message
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AddForm />
                </Modal.Body>
                <Modal.Footer>
                 <Button variant="secondary" onClick={handleClose}>
                    Close Button
                </Button>
              </Modal.Footer>
            </Modal>
           </div>
           
       
      );
 }

  
  

export default Messages;