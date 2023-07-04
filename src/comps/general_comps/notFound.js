import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function NotFound() {
  const params = useParams();
  return (
    <div className='container d-flex justify-content-center'>
      <div className='col-md-6 my-3 text-center'>
        <h1 className="text-5xl my-3">Page not found!</h1>
        <h2 className='text-xl mb-4'>{params.msg}</h2>
        <Link to="/"  className="btn btn-primary">Back to home</Link>
      </div>
    </div>
  )
}