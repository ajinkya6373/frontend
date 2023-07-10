import axios from "axios";
export const axiosInstance = axios.create({
    baseURL : "https://sharespacebackend.ajinkya6373.repl.co/api"
})

export const guestLogInDetails = {
    email:"dog@gmail.com",
    password:"Pass@123"
}

export const cloudinaryBaseUrl = 'https://res.cloudinary.com/dt43t4ytm/image/upload/';

export const avatarList = ["1.png",'2.png','3.png','4.png','5.png','6.png']


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
  
