import React, { useState, useEffect } from 'react'
import { API_URL, doApiGet } from '../../services/service';
import BookItem from '../books_comps/bookItem';



export default function MyWishList() {

    const [books, setBooks] = useState([])

    useEffect(() => {
        doApi()
    }, [books])


    const doApi = async () => {
        let url = API_URL + "/wishes/myWishList"
        try {
            let resp = await doApiGet(url);
            console.log(resp.data);
            setBooks(resp.data)
        } catch (err) {
            console.log(err);
            alert("There problem front- get wished books come back later");
        }
    }


    return (

        <div className='container d-flex justify-content-center'>
            <div className='col-md-10 my-3 text-center'>
                <div className="row justify-content-center justify-content-md-between my-3">
                    <table className='table table-striped table-hover text-end'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>מוציא לאור</th>
                                <th>סופר</th>
                                <th>סוג</th>
                                <th>פיקוח</th>
                                <th>מקצוע</th>
                                <th>כיתה</th>
                                <th>שם</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books.map((item, i) => {
                                    console.log(item);
                                    return (
                                        <BookItem key={item.book_id} doApi={doApi} index={i} item={item.book_id} isFavored={true} isAdmin={false}/>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
