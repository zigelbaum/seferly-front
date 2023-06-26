import { React } from 'react'
import {useParams} from 'react-router-dom'
import { TOKEN_NAME } from '../../services/service'; 

export default function Login_message() {
    const params = useParams();

    console.log(params.token)
    //LOOK OUT
    localStorage.setItem(TOKEN_NAME,params.token);


    return (
        <div className='container'>
            <h3>message after login: thank you for logging in!
                user token: {params.token}</h3>
        </div>
    )
}