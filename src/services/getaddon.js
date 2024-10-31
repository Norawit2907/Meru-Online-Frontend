import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function GetAddons(addons_id) {
    try{
        const response = await axios.get(`${backendUrl}/addons/${addons_id}`)
        console.log("res ", response)
        return response.data
    }
    catch (err){
        console.log(err);
    }
}