import React, { useEffect,useContext } from 'react'
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { TOKEN_NAME } from '../../services/service';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';

const Logout = () => {
    const nav = useNavigate();
    const {isLogedIn,setLogedIn} = useContext(UserContext);
  
    useEffect(() => {
        disconnected()
    }, [])
    const disconnected = async () => {
        
        setLogedIn(false);
        localStorage.removeItem(TOKEN_NAME);
        nav('/login')

    }
    return (
        <div></div>
    )
}

export default Logout