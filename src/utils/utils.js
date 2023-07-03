import axios from "axios";
export const axiosInstance = axios.create({
    baseURL : "https://sharespacebackend.ajinkya6373.repl.co/api"
})

export const guestLogInDetails = {
    email:"dog@gmail.com",
    password:"Pass@123"
}
