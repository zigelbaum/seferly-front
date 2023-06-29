import React, { useState,useEffect,useContext } from 'react'
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { TOKEN_NAME } from '../../services/service';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';
import "./logout.css"

const Logout = () => {
    const [showPopup, setShowPopup] = useState(false);
    const nav = useNavigate();
    const {isLogedIn,setLogedIn} = useContext(UserContext);
  
    useEffect(() => {
        disconnected()
    }, [])
    const disconnected = async () => {
        
        setLogedIn(false);
        localStorage.removeItem(TOKEN_NAME);
        setShowPopup(true)
        // nav('/login')

    }
    const handlePopupClose = () => {
        setShowPopup(false);
        nav('/login')
      };
    return (
        <div>
            {showPopup && (
        <div className="popup">
          <p>You have successfully logged out!</p>
          <button onClick={handlePopupClose}>Close</button>
        </div>
      )}
        </div>
    )
}

export default Logout