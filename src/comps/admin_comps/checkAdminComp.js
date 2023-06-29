import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/service';

// קומפנינטה שכל תפקידה לבדוק אם המשתמש הוא אדמין
// תתווסף בכל קומפנינטה שהמשתמש חייב להיות
// אדמין כדי לבצע פעולות בה
export default function CheckAdminComp() {
  
  let nav = useNavigate();

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    try{
      let url = API_URL+"/users/checkToken"
      let resp = await doApiGet(url);
      console.log(resp.response.status);
      if(resp.status == 401){
        alert("you are not loged in");
        nav("/login")
      }
      if(resp.data.role != "admin"){
        alert("You must be admin to be here ,try log in again");
        nav("/")
      }
    }
    catch(err){
      alert("There problem ,try log in again");
      nav("/admin")
    }


  }
  
  return (
    <React.Fragment></React.Fragment>
  )
}
