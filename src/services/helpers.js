import axios from 'axios'
import { doApiGet, API_URL } from './service'

const citiesAPI = 'https://data.gov.il/api/3/action/datastore_search'

export const getCities = async (_country) => {
    // const { data } = await axios.get(citiesAPI, {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    // console.log(data);
    // return data.data;

}

export const getBooks = async () => {
    const { data } = await doApiGet(API_URL + "/books/booksList")
    return data;
}

export const uploadImage = async (file) => {
    if (file == "" || file == null || file == undefined) {
        return false
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    const resp = await axios.post(
        "https://api.cloudinary.com/v1_1/drzabwmdc/image/upload",
        formData)
    return resp.data.url

}