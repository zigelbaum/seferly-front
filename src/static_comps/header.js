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
                <Link to="/usersList">Users</Link>
              </div>
              <div className='d-none d-md-flex'>
                <Link to="/uploadsList">Home</Link>
              </div>
              {/* <div className='d-none d-md-flex'>
                <Link to="/uploadForm">upload form</Link>
              </div> */}
              <div className='d-none d-md-flex'>
                <Link to="/booksList">Books</Link>
              </div>
              <div className='d-none d-md-flex'>
                <Link to="/bookInput">Add a New Book</Link>
              </div>
              <div className='d-none d-md-flex'>
                <Link to="/myInfo">My Info</Link>
              </div>
              <div className='d-none d-md-flex '>
                <Link to="/logout"><i class="fa fa-sign-out fa-2x" aria-hidden="true"></i></Link>
                <span class="glyphicon glyphicon-log-out"></span>
              </div>
              <div className="d-flex justify-content-md-end">
                <Link to="/login">
                <i class="fa fa-user fa-2x" aria-hidden="true"></i>
                </Link>
              </div>
            <hr />
            </div>
      </Container>
    </header>
  )
}
