import axios from "axios";
export const axiosInstance = axios.create({
    baseURL : "http://localhost:8000/api"
})

export const guestLogInDetails = {
    email:"dog@gmail.com",
    password:"Pass@123"
}

export const cloudinaryBaseUrl = 'https://res.cloudinary.com/dt43t4ytm/image/upload/';


