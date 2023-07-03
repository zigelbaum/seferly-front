import React, { useState, useRef, useEffect,useContext } from 'react'
// import Select from "react-select";
import SelectSubject from '../inputComps/selectSubject';
import { getSubjects } from '../../services/helpers';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { checkUserAdmin } from '../../services/service'; 
import { UserContext } from '../../App';
import { API_URL, doApiMethod } from '../../services/service'
import SelectGrade from '../inputComps/selectGrade'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BookInput() {

    const [subjects, setSubjects] = useState([])
    const {isLogedIn,setLogedIn}= useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const nav = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedSub, setSelectedSub] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("");

   const subjectRef = useRef();
   const gradeRef = useRef();
   const supervisionRef = register("supervision", { required: true, minLength: 2, maxLength: 50 });
   const nameRef = register("name", { required: true, minLength: 2, maxLength: 50 });
   const typeRef = register("type", { required: true, minLength: 2, maxLength: 50 });
   const authorRef = register("author_name", { required: true, minLength: 2, maxLength: 50 });
   const publisherRef = register("publisher", { required: true, minLength: 2, maxLength: 50 });
   
   const getAdmin = async () => {
    console.log(checkUserAdmin());
    return (await checkUserAdmin());
  }

    useEffect(() => {
        if(isLogedIn){ //onlu admin can add a new book
            getAdmin() && getAllSubjects()
        } else{
            nav("/*/you must be logged in as an admin!")
        }
       
    }, [])

    const getAllSubjects = async () => {
        let data = await getSubjects();
        console.log(data)
        setSubjects(data);
    }
    
    const onSub = (_dataBody) => {
        _dataBody.class=selectedGrade;
        _dataBody.subjectId = selectedSub;
        console.log(_dataBody);
        setIsSubmitted(true);
        doApi(_dataBody);
    }


    const doApi = async (_dataBody) => {
        try {
            const url = API_URL + '/books';
            const { data } = await doApiMethod(url, "POST", _dataBody);
            console.log(data)
            toast.success('Book added successfully !', {
                position: toast.POSITION.TOP_RIGHT
            });
            

        }
        catch (err) {
        
            alert(err.response.data.msg || err.response.data[0].message)
            setIsSubmitted(false);
        }
    };

    return (
        <div className='container col-md-6'>
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit(onSub)}>
                <SelectGrade  register={register} setSelectedGrade={setSelectedGrade}  gradeRef={gradeRef} />

                {subjects && <SelectSubject register={register} setSelectedSub={setSelectedSub} subjects={subjects} subjectRef={subjectRef} />}

                <input {...supervisionRef} type="text" className='form-control m-2' placeholder="Supervision" />
                {errors.supervision && <div className='text-danger'>* Enter a valid supervision, must contain 2-50 characters!</div>}

                <input {...nameRef} type="text" className='form-control m-2' placeholder="Name" />
                {errors.name && <div className='text-danger'>* Enter a valid name, must contain 2-50 characters!</div>}

                <input {...typeRef} type="text" className='form-control m-2' placeholder="Type" />
                {errors.type && <div className='text-danger'>* Enter a valid type, must contain 2-50 characters!</div>}

                <input {...authorRef} type="text" className='form-control m-2' placeholder="Author name" />
                {errors.author_name && <div className='text-danger'>* Enter a valid author name, must contain 2-50 characters!</div>}

                <input {...publisherRef} type="text" className='form-control m-2' placeholder="Publisher name" />
                {errors.publisher && <div className='text-danger'>* Enter a valid publisher  name, must contain 2-50 characters!</div>}

                <button className='btn btn-primary mt-3'>Save</button>
                <ToastContainer />
            </form>
        </div>
    )
}
