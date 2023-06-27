import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Pagination } from '@mui/material';
import { API_URL, doApiGet, checkUserAdmin } from '../../services/service';
import BookItem from './bookItem';

export default function BooksList() {
  const [ar, setAr] = useState([]);

  const [isAdmin, setIsAdmin] = useState("false");

  const [querys] = useSearchParams();

  const [page, setPage] = useState(1);
  
  const [totalPages, setTotalPages] = useState(1);
 

  const nav = useNavigate();

  useEffect(() => {
    calcPages();
    getAdmin();
  },[])

  useEffect(() => {
    let p = querys.get("page") || 1;
    doApi(p);
  }, [querys])
  

  const doApi = async (p) => {
    let url = API_URL + "/books/booksList?page=" + p;
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);
    }
    catch (err) {
      console.log(err);
      alert("there problem doApi - booksList ,try again later")
    }
    
  }
  
  const getAdmin = async () => {
    setIsAdmin(await checkUserAdmin());
  }

  const handleChange = (event, value) => {
    setPage(value);
    nav(`/booksList?page=${value}`)
  };

  const calcPages = async() => {
    try{
    let url = API_URL + '/books/count';
    let resp = await doApiGet(url);
    console.log((resp.data.count)/10);
    setTotalPages(Math.ceil(Number(resp.data.count)/10))
    } catch (err){
      console.log(err);
      alert("there problem calcPages ,try again later")
    }
  }


  return (
    <div className='container'>
      <h1>List of study books</h1>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Class</th>
            {/* <th>Subject</th> */}
            <th>Supervision</th>
            <th>Type</th>
            <th>Author name</th>
            <th>Publisher</th>
            {isAdmin && (<th>Delete</th>)}
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            return (
              <BookItem key={item._id} doApi={doApi} index={i} item={item} isAdmin={isAdmin} />
            )
          })}
        </tbody>
      </table>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </div>
  )
}
