import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Button, IconButton, Popover } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Event, FmdGood, Sell } from '@mui/icons-material';
import "./uploadItem.css";

export default function UploadItem(props) {
    let item = props.item;
    const [show, setShow] = useState(false);
    const [datePublished, setDatePublished] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [myPosts] = useState(props.myPosts)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const open = Boolean(anchorEl);

    const isFieldEmpty = (_field) => {
        return _field === undefined || _field === null || _field === "";
    }

    useEffect(() => {

        const date = new Date(item.date_created)
        // Create options object with date formatting
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

        // Format the date as per the options
        const formattedDate = date.toLocaleDateString(undefined, options);
        setDatePublished(formattedDate)
    }, [])

    const onDelClick = () => {
        console.log("delClick")
    }

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

                        {myPosts && <div>
                            <IconButton onClick={(e) => { e.stopPropagation(); onDelClick(); }}>
                                <DeleteIcon sx={{ width: 33, height: 33 }} />
                            </IconButton>
                        </div>}
                    </div>
                    <div className="h6 mt-2 ms-1">{item.bookId.name}</div>
                    <div className='text-muted ms-1'>{item.price} NIS</div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{item.bookId.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ position: 'relative' }} className='row'>
                        <div className='col-7 p-0 overflow-hidden'>
                            <img className='imgBookInfo' style={{ borderRadius: "12px" }} src={item.img_url} alt="bookImg" />
                            <div>
                                <div className="mt-2 ms-1 text-start">{item.bookId.name}</div>
                            </div>
                        </div>
                        <div className='col-5 mx-auto'>
                            <div className="mt-1 mx-auto">
                                <Avatar className="mt-1 mx-auto"
                                    sx={{ float: "start", width: 63, height: 63 }}
                                    src="/images/man.png"
                                    alt="AvatarOfBook"
                                />
                                <div style={{ fontWeight: 500 }} className="h5 mt-1 text-center dark">
                                    {item.user_id.fullName.firstName} {item.user_id.fullName.lastName}
                                </div>
                                <div className="mt-1 d-flex justify-content-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={(event) => {
                                            setAnchorEl(event.currentTarget);
                                        }}
                                    >
                                        Contact info
                                    </Button>
                                    <Popover
                                        anchorEl={anchorEl}
                                        open={open}
                                        id={open ? "simple-popover" : undefined}
                                        onClose={() => {
                                            setAnchorEl(null);
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                    >
                                        <div className="h6 mt-2 ms-1"> Phone: {item.user_id.phone}</div>
                                        <div className="h6 mt-2 ms-1">
                                            Email:{" "}
                                            <a href={`mailto:${item.user_id.email}`} style={{ textDecoration: "underline", color: "blue"}}>{item.user_id.email}</a>
                                        </div>
                                        {/* <div className="h6 mt-2 ms-1"> Email: {item.user_id.email}</div> */}
                                    </Popover>
                                </div>

                            </div>
                        </div>
                        <div className='d-flex align-items-center'>
                            <div className="d-block d-md-flex text-center">
                                <div> <FmdGood className='me-2' /></div>
                                {item.user_id.city}
                            </div>
                            <hr className='hr' />
                            <div className="d-block d-md-flex text-center">
                                <div> <Sell className='me-2' /></div>
                                <div>{item.price} NIS</div>
                            </div>
                            <hr className='hr' />
                            <div className="d-block d-md-flex text-center">
                                <div> <Event className='me-2' /></div>
                                <div>{datePublished}</div>
                            </div>
                        </div>
                    </div>
                    <hr className='mt-1 mb-1' />
                    <div >
                        <div className='h4 '>About The Book</div>
                        <div><strong>Title:</strong> {item.bookId.name}</div>
                        {!isFieldEmpty(item.bookId.subjectId.subject) && <div><strong>Subject:</strong> {item.bookId.subjectId.subject}</div>}
                        {!isFieldEmpty(item.bookId.type) && <div><strong>Type:</strong> {item.bookId.type}</div>}
                        {!isFieldEmpty(item.bookId.supervision) && <div><strong>Supervision:</strong> {item.bookId.supervision}</div>}
                        {!isFieldEmpty(item.bookId.author_name) && <div><strong>Author:</strong> {item.bookId.author_name}</div>}
                        {!isFieldEmpty(item.bookId.publisher) && <div><strong>Publisher:</strong> {item.bookId.publisher}</div>}
                        {!isFieldEmpty(item.info) && <div><strong>Additional Information:</strong> {item.info}</div>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >

    )
}



