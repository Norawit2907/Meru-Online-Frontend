import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export async function UploadImage(image){
    const formData = new FormData();
    formData.append("image", image)
    try{
        const response = await axios.post(`${backendUrl}/file-upload/single`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        if(response.status == 201 ){
            return response.data.image_url
        }
        else{
            alert("Something wrong")
            return null
        }
    }
    catch (err){
        alert("Upload Failed!")
        console.log(err)
        return null
    }
}