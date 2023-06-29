import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../comps/general_comps/logo'
import Container from '@mui/material/Container';

export default function Header() {
  return (
    <header className='container-fluid client-header bg-light shadow'>
      <Container maxWidth="lg" >
        <div className="d-flex justify-content-between align-items-center">
          <div className="logo col-auto">
            <h2><Link to="/"><Logo margin={"mb-5"} /></Link></h2>
          </div>
               <div className='d-none d-md-flex'>
                <Link to="/messages">sign up message</Link>
              </div>
              <div className='d-none d-md-flex'>
                <Link to="/messages/:token">log in message</Link>
              </div>
              <div className='d-none d-md-flex'>
                <Link to="/usersList">usersList</Link>
              </div>
              <div className='d-none d-md-flex'>
                <Link to="/uploadsList">uploadsList</Link>
              </div>
              <div className='d-none d-md-flex'>
                <Link to="/uploadForm">upload form</Link>
              </div>
              <div className='d-none d-md-flex'>
                <Link to="/booksList">booksList</Link>
              </div>
              <div className='d-none d-md-flex'>
                <Link to="/logout">Logout</Link>
              </div>
              <div className="d-flex justify-content-md-end">
                <Link to="/login">
                  <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 0 448 512" className='d-flex  justify-content-md-end'>
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                  </svg>
                </Link>
              </div>
            <hr />
            </div>
      </Container>
    </header>
  )
}
