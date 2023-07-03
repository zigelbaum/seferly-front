import React, { useState ,useContext} from 'react'
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiMethodSignUpLogin } from '../../services/service'
import { CircularProgress } from '@mui/material';
import Button from "@mui/material/Button";
import { UserContext } from '../../App';


export default function LoginForm() {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const nav = useNavigate();
  const {isLogedIn,setLogedIn} = useContext(UserContext);

  const emailRef = register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })
  const passwordRef = register("password", { required: true });

  const onSub = (dataBody) => {
    setIsSubmitted(true);
    console.log(dataBody);
    doApi(dataBody)
  }

  const doApi = async (_dataBody) => {
    try {
      const url = API_URL + '/users/login';
      const { data } = await doApiMethodSignUpLogin(url, "POST", _dataBody);
      console.log(data);
      if (data.token) {
        setLogedIn(true);
        console.log(isLogedIn);
         nav('/uploadsList')
      }
    } catch (err) {
      alert(err.response.data.msg || err.response.data[0].message)
      setIsSubmitted(false);
    }
  }

  return (
    <div className='container col-md-6 my-3 text-center'>
      <h2 >Login </h2>
      <form  >
        <input {...emailRef} type="email" className='form-control m-2' placeholder="Email" />
        {errors.email && <div className='text-danger'>* Enter a valid Email</div>}

        <input {...passwordRef} type="text" className='form-control m-2' placeholder="Password" />
        {errors.password && <div className='text-danger'>* Enter a  Password</div>}


        <Button
          onClick={handleSubmit(onSub)}
          className='btn mt-3 d-flex justify-content-center'>
          Log In
        </Button>
        <div style={{ marginTop: "14px", marginBottom: "6px" }} className='d-flex justify-content-center'>
          <p className='s14 ' style={{ marginBottom: 0 }}>Don’t have an account?</p>
          <Link to="/signUp" style={{ textDecoration: "none" }}><p style={{ marginLeft: "6px", marginBottom: 0 }} className='purple s14'>sign up now!</p></Link>
        </div>

      </form >
    </div >
  )
}
