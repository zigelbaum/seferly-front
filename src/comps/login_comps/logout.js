import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { TOKEN_NAME } from '../../services/service';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logoutUser, loginUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import "./logout.css"
import { getUserInfo } from '../../features/userSlice';


const Logout = () => {
  const nav = useNavigate();
  // const {isLogedIn,setLogedIn} = useContext(UserContext);
  const dispatch = useDispatch();
  const { loged } = useSelector((state) => state.userSlice)

  useEffect(() => {
    // if(isLogedIn)
    // {
    //   disconnected()
    // }

    //   else{ nav("/*/you are not logged in!")
    //      }
    if (localStorage[TOKEN_NAME] != null) {
      dispatch(getUserInfo())
      disconnected()
    }
    else {
      nav("/*/you are not logged in!")
    }


  }, [])

  const disconnected = async () => {
    // setLogedIn(false);
    localStorage.removeItem(TOKEN_NAME)
    dispatch(logoutUser())
    toast.success('You have logged out', {
      position: toast.POSITION.TOP_RIGHT
    });
    setTimeout(() => nav(`/login`), 2000);
  }

  return (
    <div>
      <ToastContainer />
    </div>
  )
}

export default Logout


