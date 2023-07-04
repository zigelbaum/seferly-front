import React, { useState, useEffect } from 'react'
import { CircularProgress } from "@mui/material";
import { API_URL, doApiGet } from '../../services/service';
import UploadItem from './uploadItem';
import { getSubjects } from '../../services/helpers';


import Button from "@mui/material/Button";

import "./uploadsList.css"
import Add from '../general_comps/Add';

export default function UploadsList() {
    const [ar, setAr] = useState([]);
    const [q, setQ] = useState("");//for the search query
    const [subjects, setSubjects] = useState([]);//data 
    const [filterParam, setFilterParam] = useState(["All"]);
    const [paginate, setpaginate] = useState(3);

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


    const load_more = (event) => {
        setpaginate((prevValue) => prevValue + 8);
    };

    return (


        <div className='container d-flex justify-content-center'>
        <div className='col-md-10 my-3 text-center'>
      <div className="row justify-content-center justify-content-md-between my-3">
                <div className="col-7 col-md-6 col-lg-5 col-xl-4 ">

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

                </div>


                <div className="col-5 col-md-4 col-lg-3">
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
                </div>
            </div>

            <div className="row justify-content-center">
                {search(ar)
                    .slice(0, paginate)
                    .map(item => {
                        console.log(item)
                        return (
                            <UploadItem key={item._id} item={item} myPosts={false}/>
                        )
                    })}
                {ar.length < 1 &&
                    <div style={{ display: "flex", alignItems: "center", minHeight: '100px' }}>
                        <div style={{ margin: "0 auto" }}>
                            <CircularProgress size={"50px"} />
                        </div>
                    </div>
                }
                <div>

                </div>
                <Button  style={{ color: '#228B22', border: '#228B22 1px solid', width: "100px" }}
                    onClick={load_more} >Load More</Button>
            </div>
            <Add />
        </div >
        </div>

    )
}
