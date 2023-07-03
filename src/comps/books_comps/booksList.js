import React, { useState, useRef, useEffect, useContext } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { API_URL, doApiGet, checkUserAdmin } from '../../services/service';
import BookItem from './bookItem';
import PageInation from '../general_comps/pageInation';
import { UserContext } from '../../App';
import { getSubjects } from '../../services/helpers';
import { IconButton, Popover } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "../../App.css"

export default function BooksList() {
  const [ar, setAr] = useState([]);
  const { isLogedIn, setLogedIn } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [querys] = useSearchParams();
  const [isHovered, setIsHovered] = useState(false);
  const nav = useNavigate();
  const [subjects, setSubjects] = useState([])
  // const [selectedSubject, setSelectedSubject] = useState('');
  // const [filteredBooks, setFilteredBooks] = useState(ar)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [wishList, setWishList] = useState([]);

  const open = Boolean(anchorEl);
  const ref = useRef()




  useEffect(() => {
    if (isLogedIn) {
      getAllSubjects();
      getAdmin();
      getMyWishList();
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


  const getAllSubjects = async () => {
    let data = await getSubjects();
    console.log(data)
    setSubjects(data);
  }


  const getAdmin = async () => {
    console.log(await checkUserAdmin());
    setIsAdmin(await checkUserAdmin());
  }


  const getMyWishList = async () => {
    let url = API_URL + "/wishes/myWishList";
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setWishList(resp.data.map(item=>item.book_id));
      console.log(wishList);
    } catch (err) {
      console.log(err);
      alert("there problem get my wishlist - booksList ,try again later")
    }
  }


  return (
    <div id="content-wrap">
      <div className='container'>
        <h1 className='text-end my-3'>רשימת ספרי לימוד</h1>
        {/* <div className='text-end'>
        <input id='search-box' type="text" onChange={filterBySearch} placeholder=': חפש ספר' />
      </div> */}


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
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {ar.map((item, i) => {
              let isFavored = wishList.includes(item._id);
              console.log(isFavored);
              // console.log(item);
              return (
                <BookItem key={item._id} doApi={doApi} index={i} item={item} isAdmin={isAdmin} isFavored={isFavored}/>
              );
            })}
          </tbody>
        </table>

        <div className='d-flex justify-content-center'>
          <PageInation navUrl={"booksList"} countlUrl={"/books/count"} perPage={querys.get("perPage") || 10} />
        </div>
      </div>
    </div>
  )
}
