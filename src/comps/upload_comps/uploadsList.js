import React, { useState, useEffect } from 'react'
import { CircularProgress } from "@mui/material";
import { API_URL, doApiGet } from '../../services/service';
import UploadItem from './uploadItem';

export default function UploadsList() {
    const [ar, setAr] = useState([]);

    useEffect(() => {
        doApi();
    }, [])

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


    return (
        <div className='container'>
            <h2>List of uploads</h2>
            <div className="row justify-content-center">
                {ar.map(item => {
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

        </div>
    )
}
