import React, { useState, useEffect, useContext } from 'react'
import { API_URL, TOKEN_NAME, doApiGet, checkUserAdmin } from '../../../services/service';
//import CheckAdminComp from '../checkAdminComp'
import UserItem from './userItem';
//import { UserContext } from '../../../App';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../../features/userSlice';

export default function UsersList() {
  const [ar, setAr] = useState([]);
  // const { isLogedIn, setLogedIn } = useContext(UserContext);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { loged } = useSelector((state) => state.userSlice);
  const { user } = useSelector((state) => state.userSlice);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (localStorage[TOKEN_NAME] != null) {
      dispatch(getUserInfo())
      getAdmin();

    }
    else {
      nav("/*/you are not logged in!")
    }
  }, [])

  const getAdmin = async () => {
    console.log(await checkUserAdmin());
    let adminFlag=(await checkUserAdmin());
    setIsAdmin(adminFlag);
    if (adminFlag) { console.log("1"); doApi() }
    else {
      nav("/*/you must be an admin to access this page!")
    }
  }

  const doApi = async () => {
    let url = API_URL + "/users/usersList";
    try {
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <div>
      {isAdmin &&  <div className='container d-flex justify-content-center'>
        <div className='col-md-10 my-3 text-center'>
            <h2 className="text-xl my-3">List of Registered Users</h2>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>City</th>
              <th>Phone</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {ar.map((item, i) => {
              return (
                <UserItem key={item._id} doApi={doApi} index={i} item={item} />
              )
            })}
          </tbody>
        </table>
      </div>
      </div>}
    </div>
  )
}
