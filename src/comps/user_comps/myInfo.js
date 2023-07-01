import React, {useContext, useEffect} from 'react'
import { UserContext } from "../../App";
import { doApiGet ,API_URL} from '../../services/service';
import { useNavigate } from 'react-router-dom';


export default function MyInfo() {

    const { isLogedIn } = useContext(UserContext);

    const nav = useNavigate();


    useEffect(()=>{
        if (!isLogedIn) {
            nav("/*/you must be logged in!")
        }
        else {
            doApi();
        }
    },[])

    const doApi = async () => {
        try {
            const url = API_URL + '/users/myInfo';
            const { data } = await doApiGet(url);
            console.log(data)
        }
        catch (err) {
            // alert(err.response.data.msg || err.response.data[0].message)
            // setIsSubmitted(false);
        }
    };

  return (
    <div>MyInfo</div>
  )
}
