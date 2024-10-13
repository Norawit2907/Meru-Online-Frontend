import axios from "axios";

export async function GetWatCard(keyword) {
    const response = await axios.get(`${process.env.BACKEND_URL}/${keyword}`)
    console.log('team')
    return response.data
}