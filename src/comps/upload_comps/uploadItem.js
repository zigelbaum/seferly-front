import React, { useState, useEffect } from 'react'
import { API_URL, doApiMethod } from '../../services/service';
import { Modal, Button } from 'react-bootstrap';
import { format } from 'date-fns';

export default function UploadItem(props) {
    let item = props.item;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [datePublished, setDatePublished] = useState(Date(item.date_created));

    return (
        <div>
            <div className='col-md-6 border' onClick={handleShow}>
                <img src={item.img_url} className="w-25 float-start me-2" alt="book pic" />
                <h2>{item.bookId.name}</h2>
                <div>Price: {item.price}</div>
            </div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{item.bookId.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div> <strong>upload info:</strong>
                        <div>picture: {item.img_url}</div>
                        <div>Info: {item.info}</div>
                        <div>Date created: {datePublished}</div>
                        <div>price: {item.price}</div>
                    </div>
                    <div><strong>Book info:</strong>
                        <div>publisher: {item.bookId.publisher}</div>
                        <div>supervision: {item.bookId.supervision}</div>
                        <div>author: {item.bookId.author_name}</div>
                        <div>name: {item.bookId.name}</div>
                        <div>type: {item.bookId.type}</div>
                        <div>subject: {item.bookId.subject}</div>
                    </div>
                    <div><strong>contact info:</strong>
                        <div> Name: {item.user_id.fullName.firstName} {item.user_id.fullName.lastName}</div>
                        <div> Phone: {item.user_id.phone}</div>
                        <div> Email: {item.user_id.email}</div>
                        <div> City: {item.user_id.city}</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}
