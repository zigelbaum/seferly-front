import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import {useNavigate } from 'react-router-dom';
import {API_URL,doApiMethodSignUpLogin} from '../../services/service'
export default function LoginForm() {

  const [isSubmitted,setIsSubmitted]=useState(false);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const nav=useNavigate();

  const emailRef = register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })
  const passwordRef = register("password", { required: true});

  const onSub = (dataBody) => {
    setIsSubmitted(true);
    console.log(dataBody);
    doApi(dataBody)
  }

  const doApi = async (_dataBody) => {
    try {
        const url = API_URL + '/users/login';
        const { data } = await doApiMethodSignUpLogin(url,"POST",_dataBody);
        console.log(data);
        if (data.token) {
          nav(`/messages/${data.token}`)
        }
    } catch (err) {
        alert(err.response.data.msg || err.response.data[0].message)
        setIsSubmitted(false);
    }
}


  return (
    <div className='container col-md-6 my-3'>
      <h2 >Login form</h2>
      <form onSubmit={handleSubmit(onSub)} >
        <input {...emailRef} type="email" className='form-control m-2' placeholder="Email" />
        {errors.email && <div className='text-danger'>* Enter a valid Email</div>}

        <input {...passwordRef} type="text" className='form-control m-2' placeholder="Password" />
        {errors.password && <div className='text-danger'>* Enter a  Password</div>}

        <button className='btn btn-primary mt-3'>Login</button>
      </form >
    </div >
  )
}
