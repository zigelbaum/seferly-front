import React, { useState, useEffect, useRef } from 'react'
import { useForm } from "react-hook-form";
import {useNavigate } from 'react-router-dom';
import {API_URL,doApiGet,doApiMethodSignUpLogin} from '../../services/service'
import { getCities } from '../../services/helpers';
import SelectCity from '../inputComps/selectCity';


export default function NewUserForm() {

  const [isSubmitted,setIsSubmitted]=useState(false);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const nav=useNavigate();

  const firstNameRef = register("fullName[firstName]", { required: true, minLength: 2, maxLength: 50 });
  const lastNameRef = register("fullName[lastName]", { required: true, minLength: 2, maxLength: 50 });
   const phoneRef = register("phone", { required: true, pattern: /[0-9]{9,10}|/ });
  const emailRef = register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })

  const cityRef=useRef();
  // const cityRef = register("city", { required: true });
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
        if (data.email){
          nav(`/messages/?s=${data.email}`)
  
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

        {/* <select {...cityRef} className='form-select m-2'>
          <option value="">Select your city...</option>
          <option>...</option>
        </select> */}
                 {cities && <SelectCity cityRef={cityRef} cities={cities} setSelectedCity={setSelectedCity} selectedCity={selectedCity} register={register} />}

        {errors.city && <div className='text-danger'>* You must select a city</div>}

        <input {...passwordRef} type="text" className='form-control m-2' placeholder="Password" />
        {errors.password && <div className='text-danger'>* Enter a valid Password, must contain 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character!</div>}

        <input {...password2Ref} type="text" className='form-control m-2' placeholder="Re-Enter Password" />
        {errors.password2 && <div className='text-danger'>* Passwords do not match!</div>}

        <button className='btn btn-primary mt-3'>Sign Up</button>
      </form >

      {/* <form onSubmit={handleSubmit(onSub)} >
        <div className='form-row1 d-flex flex-wrap justify-content-around p-2'>
          <div className='col-md-5'>
            <input {...fisrtNameRef} type="text" className='form-control' placeholder="First Name" />
            {errors.firstName && <div className='text-danger'>* Enter a valid name, must contain 2-50 characters!</div>}
          </div>
          <div className='col-md-5'>
            <input {...lastNameRef} type="text" className='form-control' placeholder="Last Name" />
            {errors.lastName && <div className='text-danger'>* Enter a valid name, must contain 2-50 characters!</div>}
          </div>
        </div>
        <div className='form-row2 d-flex flex-wrap justify-content-around p-2'>
          <div className='col-md-5'>
            <input {...emailRef} type="email" className='form-control' placeholder="Email" />
            {errors.email && <div className='text-danger'>* Enter a valid Email</div>}
          </div>
          <div className='col-md-5'>
            <input {...phoneRef} type="phone" className='form-control' placeholder="Phone" />
            {errors.phone && <div className='text-danger'>* Enter a valid phone number</div>}
          </div>
        </div>
        <div className='form-row3 d-flex flex-wrap justify-content-around p-2'>
          <div className='col-md-5'>
          <select {...locationRef} className='form-select'>
              <option value="">Select your Location...</option>
              <option>...</option>
            </select> */}
      {/* TODO: get list of citys */}
      {/* {errors.location && <div className='text-danger'>* You must select a location</div>}
          </div>
          <div className='col-md-5'>
            <select {...schoolRef} className="form-select">
              <option value="">Select your School...</option>
              <option>...</option> */}
      {/* TODO: get list ofschools */}
      {/* </select>
            {errors.school && <div className='text-danger'>* You must select a school</div>}
          </div>
        </div>
        <div className='form-row4 d-flex flex-wrap justify-content-around p-2'>
          <div className='col-md-5'>
            <input {...passwordRef} type="text" className='form-control' placeholder="Password" />
            {errors.password && <div className='text-danger'>* Enter a valid Password, must contain 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character!</div>}
          </div>
          <div className='col-md-5'>
            <input {...password2Ref} type="text" className='form-control' placeholder="Re-Enter Password" />
            {errors.password2 && <div className='text-danger'>* Passwords do not match!</div>}
          </div>
        </div>
        <button className='btn btn-primary mt-3'>Sign Up</button>
      </form> */}

    </div >
  )
}