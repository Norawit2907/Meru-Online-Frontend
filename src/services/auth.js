import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function UserLogin(email, password) {
    try{
        const response = await axios.post(`${backendUrl}/auth/user/login`,
            {
                email,
                password
            }
        )
        if(response.status == 201){
            // console.log("res ", response)
            sessionStorage.setItem("access_token", response.data.access_token)
            sessionStorage.setItem("currentUser_id", response.data.sub)
            sessionStorage.setItem("currentUser_username", response.data.username)
            sessionStorage.setItem("currentUser_profileimg", response.data.user_img)
            sessionStorage.setItem("role", response.data.role)
            
            return true
        }
        else{
            
            alert("something wrong")
            return false
        }
    
    }
    catch (err){
        alert("login failed!!")
        console.log(err);
        return false
    }
}

export async function UserRegister(firstname, lastname, phoneNumber, profile_img, email, password){
    try{
        const response = await axios.post(`${backendUrl}/auth/user/register`,
            {
                firstname,
                lastname,
                phoneNumber,
                profile_img,
                email,
                password
            }
        )
        if(response.status == 201){
            return response.data
        }
        else{
            alert("something wrong")
            return false
        }
    }
    catch (err){
        alert("Register failed!!")
        console.log(err);
        return false;
    }
}

export async function WatLogin(email, password){
    try{
        const response = await axios.post(`${backendUrl}/auth/wat/login`,
            {
                email,
                password
            }
        )
        if(response.status == 201){
            // console.log("res ", response)
            sessionStorage.setItem("access_token", response.data.access_token)
            sessionStorage.setItem("role", response.data.role)
            return true
        }
        else{
            
            alert("something wrong")
            return false
        }
    
    }
    catch (err){
        alert("login failed!!")
        console.log(err);
        return false
    }
}

export async function WatRegister(email, password) {
    try{
        const response = await axios.post(`${backendUrl}/auth/wat/register`,
            {
                email,
                password
            }
        )
        if(response.status == 201){
            sessionStorage.setItem("access_token", response.data.access_token)
            sessionStorage.setItem("currentUser_id", response.data.sub)
            sessionStorage.setItem("role", response.data.role)
            return true
        }
        else{
            alert("something wrong")
            return false
        }
    }
    catch (err){
        alert("Register failed!!")
        console.log(err);
        return false;
    }
}