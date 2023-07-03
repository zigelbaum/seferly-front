import React, { useState, useEffect, useRef } from 'react'
import { useForm } from "react-hook-form";
import {useNavigate } from 'react-router-dom';
import {API_URL,doApiGet,doApiMethodSignUpLogin} from '../../services/service'
import { getCities } from '../../services/helpers';
import SelectCity from '../inputComps/selectCity';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NewUserForm() {

  const [isSubmitted,setIsSubmitted]=useState(false);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const nav=useNavigate();

  const firstNameRef = register("fullName[firstName]", { required: true, minLength: 2, maxLength: 50 });
  const lastNameRef = register("fullName[lastName]", { required: true, minLength: 2, maxLength: 50 });
   const phoneRef = register("phone", { required: true, pattern: /[0-9]{9,10}|/ });
  const emailRef = register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })

  const cityRef=useRef();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  
  // const passwordRef = register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,8}$/ });
  const passwordRef = register("password", { required: true });
  const password2Ref = register("password2", {
    required: true, validate: (val) => {
      //checks that the values in password and the password confirmation are the same
      return val == getValues("password");
    }
  })

  const onSub = (_dataBody) => {
    delete _dataBody.password2;
    setIsSubmitted(true);
    _dataBody.city=selectedCity
    console.log(_dataBody);
   doApi(_dataBody)
    //redirect to login
  }
  useEffect(() => {
    console.log("getting cities")
    getAllCities("israel")
}, [])

  const getAllCities = async (_country) => {
    let data = await getCities(_country);
    setCities(data);
    setSelectedCity(data[0])

};

  const doApi = async (_dataBody) => {
    try {
        const url = API_URL + '/users';
        const { data } = await doApiMethodSignUpLogin(url,"POST",_dataBody);
        console.log(data);

        if (data){
          toast.success('Sign up completed successfully !', {
            position: toast.POSITION.TOP_RIGHT
        });
        setTimeout(() =>  nav(`/login`), 4000);
        
       
        }
    } catch (err) {
        alert(err.response.data.msg || err.response.data[0].message)
        setIsSubmitted(false);
    }
}


  return (
    
    <div className='container col-md-6 my-4 '>
      <h2 >New user form</h2>
      <form onSubmit={handleSubmit(onSub)} >
        <input {...firstNameRef} type="text" className='form-control m-2' placeholder="First Name" />
        {errors.firstName && <div className='text-danger'>* Enter a valid name, must contain 2-50 characters!</div>}

        <input {...lastNameRef} type="text" className='form-control m-2' placeholder="Last Name" />
        {errors.lastName && <div className='text-danger'>* Enter a valid name, must contain 2-50 characters!</div>}

        <input {...emailRef} type="email" className='form-control m-2' placeholder="Email" />
        {errors.email && <div className='text-danger'>* Enter a valid Email</div>}

        <input {...phoneRef} type="phone" className='form-control m-2' placeholder="Phone" />
        {errors.phone && <div className='text-danger'>* Enter a valid phone number, area code required</div>}

        {cities && <SelectCity cityRef={cityRef} cities={cities} setSelectedCity={setSelectedCity} selectedCity={selectedCity}  />}

        <input {...passwordRef} type="text" className='form-control m-2' placeholder="Password" />
        {errors.password && <div className='text-danger'>* Enter a valid Password, must contain 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character!</div>}

        <input {...password2Ref} type="text" className='form-control m-2' placeholder="Re-Enter Password" />
        {errors.password2 && <div className='text-danger'>* Passwords do not match!</div>}

        <button className='btn btn-primary mt-3'>Sign Up</button>
       
      </form >

     
 <ToastContainer />
    </div >
  )
}