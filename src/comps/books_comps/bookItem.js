import React from 'react';
import { API_URL, doApiMethod } from '../../services/service';


export default function BookItem(props) {

    let item = props.item;

    const onDelClick = async () => {

        let url = API_URL + "/books/" + item._id;
        try {
          let resp = await doApiMethod(url, "DELETE")
          console.log(resp.data)
          if (resp.data) {
            props.doApi()
          }
        }
        catch (err) {
          console.log(err.response);
          alert("There problem deleteBook - books, or you try to change superAdmin to user");
        }
      }



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
            { props.isAdmin && (<td>
                <button onClick={onDelClick} className='badge bg-danger'>
                    Del
                </button>
            </td>)}
        </tr>
    )
}
