import React, { useState, useRef, useEffect, useContext } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { API_URL, doApiGet, TOKEN_NAME} from '../../services/service';
import { checkUserAdmin } from '../../services/service';
import BookItem from './bookItem';
import PageInation from '../general_comps/pageInation';
// import { UserContext } from '../../App';
import { getSubjects } from '../../services/helpers';
// import { IconButton, Popover } from "@mui/material";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "../../App.css"
import "../upload_comps/uploadsList.css"
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../../features/userSlice';

export default function BooksList() {
  const [ar, setAr] = useState([]);
  // const [books, setBooks] = useState([]);
  // const { isLogedIn, setLogedIn } = useContext(UserContext);
  // const [isAdmin, setIsAdmin] = useState(false);
  const [querys] = useSearchParams();
  // const [isHovered, setIsHovered] = useState(false);
  const [subjects, setSubjects] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [wishList, setWishList] = useState([]);


  const [filterParam, setFilterParam] = useState(["All"]);
  const [q, setQ] = useState("");//for the search query

  // const { loged } = useSelector((state) => state.userSlice);
  const { user } = useSelector((state) => state.userSlice);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const ref = useRef()
  const nav = useNavigate();

  useEffect(() => {
    // if (!isLogedIn) {
    //     nav("/*/you must be logged in!")
    // }
    // else {
    //     getAllBooks();
    // }
    //      }

    if (localStorage[TOKEN_NAME] != null) {
      dispatch(getUserInfo())
      getAllSubjects();
      setIsAdmin(getAdmin);
      getMyWishList();
    }
    else {
      nav("/*/you are not logged in!")
    }
  }, [])

  // useEffect(() => {
  //   if (isLogedIn) {
  //     getAllSubjects();
  //     getAdmin();
  //     getMyWishList();
  //   } else {
  //     nav("/*/you must be logged in!");
  //   }
  // }, [])


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
      setWishList(resp.data.map(item => item.book_id));
      console.log(wishList);
    } catch (err) {
      console.log(err);
      alert("there problem get my wishlist - booksList ,try again later")
    }
  }

  const search = (items) => {
    return items.filter((item) => {
      console.log(item.subjectId.subject)
      console.log(item.subjectId.subject == filterParam)
      if (item.subjectId.subject == filterParam) {
        return item.name
          .toLowerCase()
          .indexOf(q.toLowerCase()) > -1
      } else if (filterParam == "All") {
        return item.name
          .toLowerCase()
          .indexOf(q.toLowerCase()) > -1

      }
    }
    )
  }


  return (

    <div className='container'>
      <h1 className='text-end '>רשימת ספרי לימוד</h1>
      <div className="row justify-content-center justify-content-md-between my-3">
        <div className="col-7 col-md-6 col-lg-5 col-xl-4 ">


          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for a book..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
        </div>

        <div className="col-5 col-md-4 col-lg-3">
          <select

            onChange={(e) => {
              setFilterParam(e.target.value);
            }}
            className="custom-select"
            aria-label="Filter Books By Subject">
            <option value="All">Filter By Subject</option>
            {subjects && subjects.map((subject) => (
              <option value={subject.subject} key={subject._id} className="capitalize text-end">
                {subject.subject}
              </option>
            ))}

          </select>
        </div>

        <span className="focus"></span>

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
            {search(ar)
              .map((item, i) => {
                let isFavored = wishList.includes(item._id);
                console.log(isFavored);
                // console.log(item);
                return (
                  <BookItem key={item._id} doApi={doApi} index={i} item={item} isAdmin={isAdmin} isFavored={isFavored} />
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
