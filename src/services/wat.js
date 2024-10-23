import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function updateWat(id, admin_id, name, max_workload, description, picture) {
    try{
        const response = await axios.put(`${backendUrl}/wats/${id}`,
            {
                admin_id,
                name,
                max_workload,
                description,
                picture
            }
        )

        if (response.status == 200){
            return response.data
        }
        else{
            alert("Womething is wrong")
            return false
        }
        // console.log("res ", response)
    }
    catch (err){
        console.log(err);
    }
}

export async function updateAddressByWatId(wat_id, address, street, alley, province, distrinct, sub_distrinct, postalCode, latitude, longtitude){
    try{
        const response = await axios.put(`${backendUrl}/addresses/wat/${wat_id}`,
            {
            wat_id,
            address,
            street,
            province,
            alley,
            distrinct,
            sub_distrinct,
            postalCode,
            latitude,
            longtitude
            }
        )
        if (response.status == 200){
            return response.data
        }
        else{
            alert("Womething is wrong")
            return false
        }
    }
    catch (err){
        console.log(err);
    }
}import axios from "axios";

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