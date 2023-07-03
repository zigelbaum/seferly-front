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

  const [subjects, setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([])
  const ref = useRef()


  const getAllSubjects = async () => {
    let data = await getSubjects();
    console.log(data)
    setSubjects(data);
  }

  const handleSubChange = (event) => {
    setSelectedSubject(event.target.value);
  };


  useEffect(() => {
    if (isLogedIn) {
      getAdmin() && getAllSubjects();
      helper();
    }

  }, [])

  useEffect(() => {
  console.log(filteredBooks)
    
  }, [filteredBooks])
  
  useEffect(() => {
    let page = querys.get("page") || 1;
    let perPage = querys.get("perPage") || 10;
    doApi(page, perPage);
  }, [querys])

const helper=async()=>{
  setFilteredBooks(ar.filter((book) => {
    console.log(selectedSubject)
    if (selectedSubject === "") {
      return true;
    }

    return book.subjectId._id === selectedSubject;
  } ))

}
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




  return (
    <div className='container'>
      <h1 className='text-end'>רשימת ספרי לימוד</h1>
      <div>
        <select ref={ref} className='form-select m-2' value={selectedSubject} onChange={() => {
          setSelectedSubject(ref.current.value)
          helper()
       }}
          >
          <option value="">Subject</option>
          {subjects && subjects.map((subject) => (
            <option value={subject._id} key={subject._id} className="capitalize text-end">
              {subject.subject}
            </option>
          ))}
        </select>
      </div >

      <table className='table table-striped table-hover text-end'>
        <thead>
          <tr>
            {isAdmin && <th></th>}
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
          {
            filteredBooks.map((item, i) => {
            console.log(item)
            return (
          <BookItem key={item._id} doApi={doApi} index={i} item={item} isAdmin={isAdmin} />
          )
           
        
        })}

        </tbody>
      </table>
      <div className='d-flex justify-content-center'>
        <PageInation navUrl={"booksList"} countlUrl={"/books/count"} perPage={querys.get("perPage")||10}/>
      </div>
    </div>
  )
}
