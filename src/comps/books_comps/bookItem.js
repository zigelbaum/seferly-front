import React from 'react';
import { API_URL, doApiMethod } from '../../../services/service';


export default function BookItem(props) {

    let item = props.item;


    return (
        <tr>
            <td>{props.index + 1}</td>
            <td>{item.name}</td>
            <td>{item.class}</td>
            {/* <td>{item.subject}</td> */}
            <td>{item.supervision}</td>
            <td>{item.type}</td>
            <td>{item.author_name}</td>
            <td>{item.publisher}</td>
            <td>
                <button className='badge bg-danger'>
                    Del
                </button>
            </td>
        </tr>
    )
}
