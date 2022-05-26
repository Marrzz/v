import axios from "axios";

export const httpClient =  axios.create({
    baseURL: "https://lecturehub.azurewebsites.net/api/v1/",
    headers: {
        "Content-type": "application/json"
    }
})

export default httpClient;