import Axios, { AxiosResponse } from 'axios'
import { useState } from 'react'

const axios = Axios.create({
    baseURL: 'http://localhost:1337/api'
})


type LoginResponse = {
    "jwt": string
    "user": {
        "id": number,
        "username": string,
        "email": string,
        "provider": string,
        "confirmed": boolean,
        "blocked": boolean,
        "createdAt": string
        "updatedAt": string
    }
}

type NewAccountDetails = {
    username: string;
    password: string;
    email: string;
};

type NewlyCreatedPostToSend = {
    caption: string;
    photo: string // file id
};


let loggedInJwt = localStorage.getItem('jwt-token');

export async function login(username: string, password: string) {
    const loginResponse = await axios.post<LoginResponse>('/auth/local', { identifier: username, password })
    loggedInJwt = loginResponse.data.jwt
    localStorage.setItem('jwt-token', loginResponse.data.jwt)
    return loginResponse.data.user
}

export const createAccount = async (detailsToSend: NewAccountDetails) => {
    axios.post('/auth/local/register', { detailsToSend })
        .then(response => {
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
        })
        .catch(error => {
            console.log('An error occurred:', error.response);
        });
}


export const createNewPost = async (newPostData: NewlyCreatedPostToSend) => {
    const response = await axios.post(`/posts`, { data: newPostData }, { headers: { Authorization: `Bearer ${loggedInJwt}` } })
    return response.data
};

export async function uploadImage(wholePhoto: File) {

    let formData = new FormData();
    formData.append("files", wholePhoto);

    const response = await axios.post("/upload", wholePhoto)
    const fileId = response.data[0].id

    return fileId;
}