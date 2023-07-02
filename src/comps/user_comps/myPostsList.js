import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import UploadItem from '../upload_comps/uploadItem'; 
import { CircularProgress } from '@mui/material';
import { API_URL, doApiGet } from '../../services/service';
import { toast } from 'react-toastify';


export default function MyPostsList() {

    const nav = useNavigate();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [error, setError] = useState(undefined);


    useEffect(() => {
        loadMore()
    }, [hasNextPage])

    const loadMore = async () => {
        setLoading(true);
        setPage(prevPage => prevPage + 1);
        let url = API_URL + `/uploads/myUploads?page=${page}`
        try {
            let resp = await doApiGet(url);
            console.log(resp.data);
            setItems([...items, ...resp.data]);
            setHasNextPage(resp.data.length == 0);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
            console.log(err);
            toast.error("there problem front - myPostsList ,try again later");
        }
    };

    const { sentryRef } = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore: loadMore,
        disabled: !!error,
        rootMargin: '0px 600px 0px 0px',
    });

    return (
        <div>
            <div className='row justify-content-center'>
                {items.map((item) => {
                    return (
                        <UploadItem key={item._id} item={item} />
                    )
                })}
                {(loading) && (
                    <div ref={sentryRef}>
                        <div style={{ display: "flex", alignItems: "center", minHeight: '100px' }}>
                            <div style={{ margin: "0 auto" }}>
                                <CircularProgress size={"50px"} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* <FabComp/> */}

        </div>
    )
}
