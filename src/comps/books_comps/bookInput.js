import React, { useState, useRef, useEffect } from 'react'
// import Select from "react-select";
import SelectSubject from '../inputComps/selectSubject';
import { getSubjects } from '../../services/helpers';
import { useForm } from "react-hook-form";


export default function BookInput(props) {

    const [subjects, setSubjects] = useState([])

    const { register } = useForm();

    const subjectRef = useRef(null);

    useEffect(() => {
        getAllSubjects()
    }, [])

    const getAllSubjects = async () => {
        let data = await getSubjects();
        setSubjects(data);
    }


    return (
        <div className="row justify-content-center justify-content-md-between mx-sm-3 mx-xs-5 px-md-3 mx-lg-5 px-lg-5 mb-5">
            <div className="col-7 col-md-6 col-lg-5 col-xl-4">
                {subjects && <SelectSubject subjectRef={subjectRef} subjects={subjects} setSelectedSubject={props.handleSetSubject} register={register} />}
            </div>
        </div>
    )
}
