import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function GetCremationsDays(wat_id) {
    try{
        const response = await axios.get(`${backendUrl}/reserves/cremationsload/${wat_id}`)
        return response.data
    }
    catch (err){
        console.log(err);
    }
}