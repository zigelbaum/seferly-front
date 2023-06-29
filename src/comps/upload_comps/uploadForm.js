import React, { useState, useEffect, useRef, useContext } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiMethod } from '../../services/service'
import { getBooks } from '../../services/helpers';
import InputImage from '../inputComps/inputImage';
import { uploadImage } from '../../services/helpers';
import SelectBook from '../inputComps/selectBook';
import { UserContext } from "../../App";


export default function NewUserForm() {


    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const nav = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedBook, setSelectedBook] = useState("");
    const [isBookSelected, setIsBookSelected] = useState(false);
    const [books, setBooks] = useState([]);
    const [imageSelected, setImageSelected] = useState(null);
    const {isLogedIn, setLogedIn} = useContext(UserContext);

    const bookRef = useRef(null);

    const priceRef = register("price", { required: true, max: 1000 })
    const infoRef = register("info", { maxLength: 400 });

    useEffect(() => {
        if(!isLogedIn){
            nav("/*/you must be logged in!")
        }
       else{
        getAllBooks();
       }
    }, [])

    const getAllBooks = async () => {
        let data = await getBooks();
        setBooks(data);
    }


    const onSub = (_dataBody) => {
        _dataBody.bookId = selectedBook;
        console.log(_dataBody);
        setIsSubmitted(true);
        doApi(_dataBody);

    }

    const doApi = async (_dataBody) => {
        try {
            _dataBody.img_url = imageSelected ? await uploadImage(imageSelected) : null;
            const url = API_URL + '/uploads';
            const { data } = await doApiMethod(url, "POST", _dataBody);
            console.log(data)
        }
        catch (err) {
            alert(err.response.data.msg || err.response.data[0].message)
            setIsSubmitted(false);
        }
    };


    return (
        <div className='container col-md-6'>
            <h2>Post a Book for Sale</h2>
            <form onSubmit={handleSubmit(onSub)}>

                {books && <SelectBook bookRef={bookRef} books={books} errors={errors} setSelectedBook={setSelectedBook} register={register} />}

                <label>Price:</label>
                <input {...priceRef} type="number" className='form-control m-2'></input>
                {errors.price && <div className='text-danger'>*Field required! (Maximum price is 1000)</div>}

                <InputImage setImageSelected={setImageSelected} />

                <label>Additional info:</label>
                <textarea {...infoRef} type="text" className='form-control m-2' rows="5" placeholder='...'></textarea>
                {errors.info && <div className='text-danger'>*The paragraph entered may not exceed 400 characters!</div>}

                <button className='btn btn-primary mt-3'>Save</button>
            </form>
        </div>
    )
}
