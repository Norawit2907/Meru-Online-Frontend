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

export async function getAddressByWatId(wat_id){
    try{
        const response = await axios.get(`${backendUrl}/addresses/wat/${wat_id}`)
        if(response.status == 200){
            return response.data
        }
        else{
            return false
        }
    }
    catch(err){
        console.log(err)
    }
}

export async function updateAddressByWatId(wat_id, address, street, alley, province, distrinct, sub_distrinct, postalCode, latitude, longtitude){
    try{
        const response = await axios.put(`${backendUrl}/addresses/wat/${wat_id}`,
            {
            wat_id,
            address,
            street,
            alley,
            province,
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
}