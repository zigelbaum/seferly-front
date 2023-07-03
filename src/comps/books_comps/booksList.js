import React, { useState, useRef, useEffect, useContext } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { API_URL, doApiGet, checkUserAdmin } from '../../services/service';
import BookItem from './bookItem';
import PageInation from '../general_comps/pageInation';
import { UserContext } from '../../App';
import { getSubjects } from '../../services/helpers';

export default function BooksList() {
  const [ar, setAr] = useState([]);
  const { isLogedIn, setLogedIn } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [querys] = useSearchParams();
  const nav = useNavigate();
  const [subjects, setSubjects] = useState([])
  // const [selectedSubject, setSelectedSubject] = useState('');
  const [filteredBooks, setFilteredBooks] = useState(ar)
  const ref = useRef()


  const getAllSubjects = async () => {
    let data = await getSubjects();
    console.log(data)
    setSubjects(data);
  }



  useEffect(() => {
    if (isLogedIn) {
       getAllSubjects();
    } else {
      nav("/*/you must be logged in!");
    }
 
  }, [])


  useEffect(() => {
    let page = querys.get("page") || 1;
    let perPage = querys.get("perPage") || 10;
    doApi(page, perPage);
  }, [querys])

  const doApi = async (page, perPage) => {
    let url = API_URL + "/books/booksList?page=" + page + "&perPage=" + perPage;
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
    console.log(checkUserAdmin());
    setIsAdmin(await checkUserAdmin());
  }

  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    if (!query) {
      setFilteredBooks(ar)
    } else {
      // Create copy of item list
      var updatedList = [...ar];
      // Include all elements which includes the search query
      updatedList = updatedList.filter((item) => {
        return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      }
      );
      // Trigger render with updated values
      setFilteredBooks(updatedList);
    }

  };


  return (
   <div className='container'>
      <h1 className='text-end my-3'>רשימת ספרי לימוד</h1>
      <div className='text-end'>
        <input id='search-box' type="text" onChange={filterBySearch} placeholder=': חפש ספר' />
      </div>


      <table className='table table-striped table-hover text-end'>
        <thead>
          <tr>
            {isAdmin && <th></th>}
            <th></th>
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
          {filteredBooks && filteredBooks.map((item, i) => {
            console.log(item);
            return (
              <BookItem key={item._id} doApi={doApi} index={i} item={item} isAdmin={isAdmin} />
            );
          })}
        </tbody>
      </table>

      <div className='d-flex justify-content-center'>
        <PageInation navUrl={"booksList"} countlUrl={"/books/count"} perPage={querys.get("perPage") || 10} />
      </div>
    </div>
  )
}
