import React, { useState, useEffect, useContext } from 'react'
import { API_URL, doApiGet } from '../../../services/service';
import CheckAdminComp from '../checkAdminComp'
import UserItem from './userItem';
import { UserContext } from '../../../App';
import { useNavigate } from 'react-router-dom'

export default function UsersList() {
  const [ar, setAr] = useState([]);
  const {isLogedIn,setLogedIn}= useContext(UserContext);
  const nav = useNavigate();

  useEffect(() => {
    if (!isLogedIn) {
      nav("/*/you must be logged in!");
    }
    else {
      doApi();
    }
  }, [])

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
    isLogedIn && <div className='container'>
      <CheckAdminComp/>
      <h1>List of users in systems</h1>
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
            <th>Delete</th>
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
  )
}
