import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/service'
import MailSender from '../../services/mailSender';

export default function WishListCheck(props) {

    const [wishers, setWishers] = useState([]);

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        let url = API_URL + "/wishes/bookWishes" + props.bookId;
        try {
            let data = await doApiGet(url);
            setWishers(data);
            console.log(data);
        } catch (err) {
            console.log(err);
            alert("there problem doApi - wishList for book ,try again later")
        }
    }

    return (
        <React.Fragment>
            {
                wishers.map(item => {
                    return(
                        <MailSender bookName={item.book_id.name} userName={item.user_id.fullName.firstName} userEmail={item.user_id.email}/>
                    )
                })}
        </React.Fragment>
    )
}
