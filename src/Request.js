import axios from "axios";

const makeRequest = async (
    {
        url,
        method,
        data,
    },
) => {
    const API_URL = "https://api.themoviedb.org/3/"
    try {
        switch (method) {
            case "post": {
                return await axios.post(API_URL + url, data)
            }
            case "get": {
                return await axios.get(API_URL + url)
            }
            default:
                return null
        }
    } catch (e) {
        console.log("Error!!")
    }
}

export default makeRequest
