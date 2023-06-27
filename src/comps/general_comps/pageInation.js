import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import { API_URL, doApiGet } from '../../services/service';
import { useNavigate } from 'react-router-dom'



export default function PageInation(props) {

    const nav = useNavigate();

    const [totalPages, setTotalPages] = useState(1);

    const [page, setPage] = useState(1);

    useEffect(() => {
        calcPages();
    }, [])

    const calcPages = async () => {
        try {
            let url = API_URL + props.countlUrl;
            let resp = await doApiGet(url);
            console.log((resp.data.count) / 10);
            setTotalPages(Math.ceil(Number(resp.data.count) / 10))
        } catch (err) {
            console.log(err);
            alert("there problem calcPages ,try again later")
        }
    }

    const handleChange = (event, value) => {
        setPage(value);
        nav(`/${props.navUrl}?page=${value}`)
    };


    return (
        <Pagination count={totalPages} page={page} onChange={handleChange} />
    )
}
