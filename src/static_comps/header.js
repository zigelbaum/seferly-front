import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../comps/general_comps/logo'

export default function Header() {
  return (
    <header className='container-fluid client-header bg-light shadow'>
      <div className="container ">
        <div className="row align-items-center">
          <div className="logo col-auto">
            <h2><Link to="/"><Logo  margin={"mb-5"} /></Link></h2>
          </div>
          <nav className='d-flex col justify-content-between align-items-center'>

            <ul className='nav'>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/signUp">sign up</Link>
              </li>
              <li>
                <Link to="/messages">sign up message</Link>
              </li>
              <li>
                <Link to="/messages/:token">log in message</Link>
              </li>
              <li>
                <Link to="/usersList">usersList</Link>
              </li>
              <li>
                <Link to="/uploadsList">uploadsList</Link>
              </li>
              <li>
                <Link to="/uploadForm">upload form</Link>
              </li>
              <li>
                <Link to="/booksList">booksList</Link>
              </li>
            </ul>
            <hr />
          </nav>
        </div>
      </div>
    </header>
  )
}
