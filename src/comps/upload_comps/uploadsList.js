import React, { useState, useEffect } from 'react'
import { CircularProgress } from "@mui/material";
import { API_URL, doApiGet } from '../../services/service';
import UploadItem from './uploadItem';
import { getSubjects } from '../../services/helpers';
import SelectSubject from '../inputComps/selectSubject';

export default function UploadsList() {
    const [ar, setAr] = useState([]);
    const [q, setQ] = useState("");//for the search query
    const [subjects, setSubjects] = useState([]);//data 
    const [filterParam, setFilterParam] = useState(["All"]);

    useEffect(() => {
        doApi();
        getAllSubjects();
    }, [])

    const getAllSubjects = async () => {
        let data = await getSubjects();
        console.log("getallsubject " + data)
        setSubjects(data);
    }

    const doApi = async () => {
        let url = API_URL + "/uploads/uploadsList";
        try {
            let resp = await doApiGet(url);
            console.log(resp.data);
            setAr(resp.data);
        }
        catch (err) {
            console.log(err);
            alert("there problem doApi - uploadsList ,try again later")
        }
    }


    const search = (items) => {

        return items.filter((item) => {
            console.log(item.bookId.subjectId.subject)
            console.log(item.bookId.subjectId.subject == filterParam)
            if (item.bookId.subjectId.subject == filterParam) {
                return item.bookId.name
                    .toLowerCase()
                    .indexOf(q.toLowerCase()) > -1
            } else if (filterParam == "All") {
                    return item.bookId.name
                    .toLowerCase()
                    .indexOf(q.toLowerCase()) > -1

            }
        }
        )
    }




    return (
        <div className='container'>
            <h2>List of uploads</h2>

            <label htmlFor="search-form">
                <input
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="search-input"
                    placeholder="Search for a book..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
            </label>


            <select

                onChange={(e) => {
                    setFilterParam(e.target.value);
                }}
                className="custom-select"
                aria-label="Filter Uploads By Subject">
                <option value="All">Filter By Subject</option>
                {subjects && subjects.map((subject) => (
                    <option value={subject.subject} key={subject._id} className="capitalize text-end">
                        {subject.subject}
                    </option>
                ))}

            </select>
            {/* <select ref={ref} className='form-select m-2' value={selectedSubject} onChange={() => {
                setSelectedSubject(ref.current.value)
            }}>
                <option value="">Subject</option>
                {subjects && subjects.map((subject) => (
                    <option value={subject._id} key={subject._id} className="capitalize text-end">
                        {subject.subject}
                    </option>
                ))}
                </select> */}

            <span className="focus"></span>


            <div className="row justify-content-center">
                {search(ar).map(item => {
                    console.log(item)
                    return (
                        <UploadItem key={item._id} item={item} />
                    )
                })}
                {ar.length < 1 &&
                    <div style={{ display: "flex", alignItems: "center", minHeight: '100px' }}>
                        <div style={{ margin: "0 auto" }}>
                            <CircularProgress size={"50px"} />
                        </div>
                    </div>
                }
            </div>

        </div >
    )
}
