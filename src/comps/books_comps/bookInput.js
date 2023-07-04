import React, { useState, useRef, useEffect, useContext } from 'react'
// import Select from "react-select";
import SelectSubject from '../inputComps/selectSubject';
import { getSubjects } from '../../services/helpers';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { checkUserAdmin } from '../../services/service';
// import { UserContext } from '../../App';
import { API_URL, doApiMethod, TOKEN_NAME } from '../../services/service'
import SelectGrade from '../inputComps/selectGrade';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { getUserInfo } from '../../features/userSlice';

export default function BookInput() {

    const [subjects, setSubjects] = useState([])
    // const { isLogedIn, setLogedIn } = useContext(UserContext);
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
    //  const { loged } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage[TOKEN_NAME] != null) {
            dispatch(getUserInfo())
            getAdmin()
        }
        else {
            nav("/*/you are not logged in!")
        }
    }, [])

    const getAdmin = async () => {
        console.log(await checkUserAdmin());
        let adminFlag = (await checkUserAdmin());
        setIsAdmin(adminFlag);
        if (adminFlag) { getAllSubjects() }
        else {
            nav("/*/you must be an admin to access this page!")
        }
    }


    const getAllSubjects = async () => {
        let data = await getSubjects();
        console.log(data)
        setSubjects(data);
    }

    const onSub = (_dataBody) => {
        _dataBody.class = selectedGrade;
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

    return (<div>
        {isAdmin &&  <div className='container d-flex justify-content-center'>
        <div className='col-md-6 my-3 text-center'>
            <h2 className="text-xl my-3">Add a New Book</h2>
            <form onSubmit={handleSubmit(onSub)}>
                <SelectGrade register={register} setSelectedGrade={setSelectedGrade} gradeRef={gradeRef} />

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

                <button className='btn btn-primary mt-3'>Add</button>
                <ToastContainer />
            </form>
        </div>
        </div>}
    </div>
    )
}
