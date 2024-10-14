import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function GetWatCard(keyword, startDate, endDate) {
    try{
        const response = await axios.get(`${backendUrl}/wats/search?keyword=${keyword}`)
        // console.log("res ", response)
        return response.data
    }
    catch (err){
        console.log(err);
    }
}