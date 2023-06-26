import React from 'react'
import { API_URL, doApiMethod } from '../../../services/service';

export default function UserItem(props) {
  let item = props.item;

  // משנה תפקיד של משתמש
  const onRoleClick = async () => {
    let bodyData;
    if (item.role == "user") {
      bodyData = { role: "admin" }
    }
    else {
      bodyData = { role: "user" }
    }

    let url = API_URL + "/users/changeRole/" + item._id;
    try {
      let resp = await doApiMethod(url, "PATCH", bodyData)
      console.log(resp.data)
      if (resp.data) {
        props.doApi()
      }
    }
    catch (err) {
      console.log(err.response);
      alert("There problem changeRole - users, or you try to change superAdmin to user");
    }
  }

  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{item.fullName.firstName} {item.fullName.lastName}</td>
      <td>{item.email}</td>
      <td>
        <button onClick={onRoleClick}>
          {item.role}
        </button>
      </td>
      <td>{item.city}</td>
      <td>{item.phone}</td>
      <td>{String(item.active)}</td>
      <td>
        <button className='badge bg-danger'>Del</button>
      </td>
    </tr>
  )
}
