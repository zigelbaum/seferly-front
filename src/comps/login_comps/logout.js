import React, { useState,useEffect,useContext } from 'react'
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { TOKEN_NAME } from '../../services/service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./logout.css"
import Userfront from "@userfront/core";

const Logout = () => {
    const [showPopup, setShowPopup] = useState(false);
    const nav = useNavigate();
    const {isLogedIn,setLogedIn} = useContext(UserContext);
  
    useEffect(() => {
      if(isLogedIn)
      {
        disconnected()
      } else {nav(`/login`)}
     
    }, [])
    const disconnected = async () => {
        
        setLogedIn(false);
        localStorage.removeItem(TOKEN_NAME)
          toast.success('You have logged out', {
            position: toast.POSITION.TOP_RIGHT
        });
        setTimeout(() =>  nav(`/login`), 4000);
    }
    const handlePopupClose = () => {
        setShowPopup(false);
        nav('/login')
      };
    return (
        <div>
           <ToastContainer />
        </div>
    )
}

export default Logout


