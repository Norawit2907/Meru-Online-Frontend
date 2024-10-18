import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function UserLogin(email, password) {
    try{
        const response = await axios.post(`${backendUrl}/auth/login`,
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
        const response = await axios.post(`${backendUrl}/auth/register`,
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