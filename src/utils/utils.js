import axios from "axios";
export const axiosInstance = axios.create({
    baseURL : "http://localhost:8000/api"
})

export const guestLogInDetails = {
    email:"dog@gmail.com",
    password:"Pass@123"
}

export const cloudinaryBaseUrl = 'https://res.cloudinary.com/dt43t4ytm/image/upload/';

// Construct the image URL using the public ID and other parameters
// const imageUrl = `${cloudinaryBaseUrl}${publicId}`;

// Optionally, you can add additional transformations or parameters to the URL
// For example, to resize the image to a specific width and height:
// const imageUrlWithTransformations = `${cloudinaryBaseUrl}w_400,h_300/${publicId}`;

