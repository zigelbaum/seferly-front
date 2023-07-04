import React from 'react'
import { Link, useParams } from 'react-router-dom'

export default function NotFound() {
  const params=useParams();
  return (
    <div className='container'>
      
      <h2>page not found 404!</h2>
      <h4>{params.msg}</h4>
      <Link to="/">Back to home</Link>
    </div>
  )
}