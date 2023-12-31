import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'
import { API_URL, doApiGet, checkUserAdmin } from '../../services/service';
import BookItem from './bookItem';
import PageInation from '../general_comps/pageInation';

export default function BooksList() {
  const [ar, setAr] = useState([]);

  const [isAdmin, setIsAdmin] = useState("false");

  const [querys] = useSearchParams();

  useEffect(() => {
    getAdmin();
  }, [])

  useEffect(() => {
    let page = querys.get("page") || 1;
    doApi(page);
  }, [querys])


  const doApi = async (page) => {
    let url = API_URL + "/books/booksList?page=" + page;
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


  return (
    <div className='container'>
      <h1>List of study books</h1>
      <table className='table table-striped table-hover text-end'>
        <thead>
          <tr>
            <th>מוציא לאור</th>
            <th>סופר</th>
            <th>סוג</th>
            <th>פיקוח</th>
            <th>מקצוע</th>
            <th>כיתה</th>
            <th>שם</th>
            <th></th>
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
      <div className='d-flex justify-content-center'>
        <PageInation navUrl={"booksList"} countlUrl={"/books/count"} />
      </div>
    </div>
  )
}
