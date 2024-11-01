import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function  getWatById(wat_id) {
    try{
        const response = await axios.get(`${backendUrl}/wats/id/${wat_id}`)
        if(response.status == 200){
            return response.data
        }
        else{
            alert("Something's Wrong")
            return false
        }
    }
    catch(err){
        console.log(err)
        return false
    }
}

export async function updateWat(wat_id, admin_id, admin_name, name, phoneNumber, line_ID, Facebook, min_cost, max_cost, max_workload, max_cremload, description, picture, location) {
    try{
        console.log("piccccc",picture);
        
        const response = await axios.put(`${backendUrl}/wats/${wat_id}`,
            {
                admin_id,
                admin_name,
                name,
                phoneNumber,
                line_ID,
                Facebook,
                min_cost,
                max_cost,
                max_workload,
                max_cremload,
                description,
                location,
                picture
            }
        )

        if (response.status == 200){
            console.log("return",response.data);
            
            return response.data
        }
        else{
            alert("Something is wrong")
            return false
        }
        // console.log("res ", response)
    }
    catch (err){
        console.log(err);
    }
}

export async function getAddonByWatId(wat_id){
    try{   
        const response = await axios.get(`${backendUrl}/addons/wat/${wat_id}`)
        if(response.status == 200){
            console.log("get", response.data);
            
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

export async function createAddon(wat_id, name, image, cost, catalog, description){
    try{
        
        const response = await axios.post(`${backendUrl}/addons`,
            {
            wat_id,
            name,
            image,
            cost,
            catalog,
            description
            }
        )
        if(response.status == 201){
            console.log("check",response.data);
            return response.data
        }
        else{
            return false
        }
    }
    catch(err){
        console.log(err.response.data.message);
        
    }
}

export async function deleteAddon(id){
    try{
        
        const response = await axios.delete(`${backendUrl}/addons/${id}`)
        if(response.status == 204){
            console.log("check",response.data);
            return response.data
        }
        else{
            return false
        }
    }
    catch(err){
        console.log(err.response.data.message);
        
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
            longtitude,
            
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
        console.log(err.response.data.message);
        
    }
}