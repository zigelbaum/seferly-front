import React, { useState, useEffect } from 'react'
import { API_URL, doApiMethod } from '../../services/service';
import { Modal } from 'react-bootstrap';
import { format } from 'date-fns';

import { Avatar, Button, IconButton, Zoom } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./uploadItem.css";

export default function UploadItem(props) {
    let item = props.item;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [datePublished, setDatePublished] = useState(Date(item.date_created));
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="mainDiv p-0">
            <div onClick={handleShow}>
                <div
                    className="p-2 overflow-hidden h-100">
                    <div className={isHovered ? 'lightDiv' : ''}
                        style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <img className='imgBook w-100' src={item.img_url} alt="imgBook" />
                        {isHovered &&
                            <IconButton
                                className="eyeBTN"
                                style={{ position: 'absolute', padding: 0 }}>
                                <VisibilityIcon className="eyeBTN" sx={{ fontSize: "40px" }} />
                            </IconButton>
                        }
                    </div>

                    <div className="mt-3 d-flex align-items-center justify-content-between w-100">
                        <div className="d-flex align-items-center">
                            <Avatar
                                sx={{ float: "start", width: 33, height: 33 }}
                                src="/images/man.png"
                                alt="AvatarOfBook"
                            />
                            <div style={{ fontWeight: 500 }} className="h6 ms-2 dark">
                                {item.user_id.fullName.firstName} {item.user_id.fullName.lastName}
                            </div>
                        </div>

                        <div>
                            <IconButton
                                // onClick={() => {
                                //     onLikeClick(item._id, user._id);
                                // }}
                                sx={{ width: 33, height: 33 }}
                                aria-label="add to favorites"
                            >
                                <FavoriteBorderIcon />
                                {/* {!item.likes.includes(user._id) ? (
                                    <FavoriteBorderIcon />
                                ) : (
                                    <FavoriteIcon sx={{ color: "red" }} />
                                )} */}
                            </IconButton>
                        </div>
                    </div>
                    <div className="h6 mt-2 ms-1">{item.bookId.name}</div>
                    <div className='text-muted ms-1'>{item.price} NIS</div>
                </div>
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
