import React from 'react'
import { API_URL, doApiMethod } from '../../../services/service';

export default function UserItem(props) {
  let item = props.item;

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


  const onActiveClick = async () => {
    let bodyData;
    if (item.active == true) {
      bodyData = { active: false }
    }
    else {
      bodyData = { active: true }
    }

    let url = API_URL + "/users/changeActive/" + item._id;
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


  // const onDelClick = async () => {

  //   let url = API_URL + "/users/" + item._id;
  //   console.log(url);
  //   try {
  //     let resp = await doApiMethod(url, "DELETE")
  //     console.log(resp)
  //     if (resp.data) {
  //       props.doApi()
  //     }
  //   }
  //   catch (err) {
  //     console.log(err.response);
  //     alert("There problem deleteUser - userItem");
  //   }
  // }

  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{item.fullName.firstName} {item.fullName.lastName}</td>
      <td>{item.email}</td>
      <td>
        <button className='badge bg-info' onClick={onRoleClick}>
          {item.role}
        </button>
      </td>
      <td>{item.city}</td>
      <td>{item.phone}</td>
      <td>
        <button className='badge bg-danger' onClick={onActiveClick}>
          {String(item.active)}
        </button>
      </td>
    </tr>
  )
}
