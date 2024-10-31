import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function MakeReservation(payload) {
    try {
        const response = await axios.post(`${backendUrl}/reserves`, payload);

        if (response.status === 201) {
            return response.data; 
        } else {
            alert("Something went wrong! Please try again.");
            return null;
        }
    } catch (err) {
        alert("Reservation failed! " + (err.response?.data?.message || err.message));
        console.error("Reservation error:", err);
        return null;
    }
}