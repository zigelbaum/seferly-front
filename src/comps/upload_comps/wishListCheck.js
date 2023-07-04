import React, { useEffect } from 'react'
import { API_URL, doApiGet } from '../../services/service'

export default function WishListCheck() {

    useEffect(()=>{
        doApi();
    },[])

    const doApi = async () => {
        let url = API_URL + ""
    }

  return (
    <React.Fragment></React.Fragment>
  )
}
