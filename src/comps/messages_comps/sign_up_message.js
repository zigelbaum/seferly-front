import {React} from 'react'
import {useSearchParams } from 'react-router-dom'

export default function Sign_up_Message() {
    const [query] = useSearchParams();

    return (
        <div className='container'>
            <h3>message after Sign up: thank you for signing up!
                please activate your account at : {query.get("s")}</h3>
        </div>
    )
}