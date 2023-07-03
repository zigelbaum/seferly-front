import axios from 'axios'
import { doApiGet, API_URL } from './service'

// const citiesAPI = 'https://data.gov.il/api/3/action/datastore_search'

export const getCities = async (_country) => {
    const { data } = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/cities",
        { "country": _country });
    console.log("in get cities")
    console.log(data.data)
    return data.data;

}

export const getBooksNames = async () => {
    const { data } = await doApiGet(API_URL + "/books/booksNamesList")
    console.log("in get books")
    console.log(data);
    return data
}

export const getSubjects = async () => {
    try {
        const { data } = await doApiGet(API_URL + "/subjects/subjectsList")
        console.log(data);
        return data;
    } catch (err) {
        throw (err);
    }
}
 
// export const getWishList = async () => {
    
// }

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