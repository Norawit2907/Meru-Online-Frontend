import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function GetWatId(id) {
    try{
        const response = await axios.get(`${backendUrl}/wats/${id}`)
        console.log(response.data)
        return response.data
    }
    catch (err){
        console.log(err);
    }
}