import axios from "axios";
export const axiosInstance = axios.create({
    baseURL : "http://localhost:8000/api"
})

export const guestLogInDetails = {
    email:"dog@gmail.com",
    password:"Pass@123"
}

export const cloudinaryBaseUrl = 'https://res.cloudinary.com/dt43t4ytm/image/upload/';

export const avatarList = ["dogAvatar.png",'catAvatar.png','birdAvatar.png']


export const lightTheme = {
    primaryBg: '#f5f5f5',
    secondaryBg: '#ffffff',
    primaryText: '#333333',
    secondaryText: '#778189',
    mainPrimary: '#ff3d64',
    mainSecondary: '#c3385b',
    iconPrimary: '#333333',
    iconSecondary: '#ef3b60',
    iconTertiary: '#19826a',
  };
  
  export const darkTheme = {
    primaryBg: '#102b3f',
    secondaryBg: '#001527',
    primaryText: '#fcedf0',
    secondaryText: '#778189',
    mainPrimary: '#ff3d64',
    mainSecondary: '#c3385b',
    iconPrimary: '#fcedf0',
    iconSecondary: '#ef3b60',
    iconTertiary: '#19826a',
  };
  
