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



type NewlyCreatedPostToSend = {
    Caption: string;
    Image: string // file id
    user: number // userId
};

export type Post = {
    id: number;
    caption: string;
    image: string;
}


let loggedInJwt = localStorage.getItem('jwt-token');

export async function login(username: string, password: string) {
    const loginResponse = await axios.post<LoginResponse>('/auth/local', { identifier: username, password })
    loggedInJwt = loginResponse.data.jwt
    localStorage.setItem('jwt-token', loginResponse.data.jwt)
    return loginResponse.data.user
}

type NewAccountDetails = {
    username: string;
    password: string;
    email: string;
};

export const createAccount = async (detailsToSend: NewAccountDetails) => {
    const registerResponse = await axios.post('/auth/local/register', detailsToSend)
    console.log('User token', registerResponse.data.jwt);
    localStorage.setItem('jwt-token', registerResponse.data.jwt)
    // eslint-disable-next-line no-restricted-globals
    window.location.href = '/'
}

export type LoggedInUser = {
    "id": number,
    "username": string
    "email": string
    "provider": string
    "confirmed": boolean,
    "blocked": boolean,
    "createdAt": string
    "updatedAt": string
}
export const getLoggedInUser = async () => {
    const res = await axios.get<LoggedInUser>('/users/me',{ headers: { Authorization: `Bearer ${loggedInJwt}` } });
    return res.data
}


export const createNewPost = async (newPostData: NewlyCreatedPostToSend) => {
    const response = await axios.post(`/posts`, { data: newPostData }, { headers: { Authorization: `Bearer ${loggedInJwt}` } })
    return response.data
};

// export async function uploadImage(wholePhoto: File) {

//     let formData = new FormData();
//     formData.append("files", wholePhoto);

//     const response = await axios.post("/upload", wholePhoto)
//     const fileId = response.data[0].id

//     return fileId;
// }

export async function uploadImage(wholePhoto: File): Promise<string | null> {
    try {
        const formData = new FormData();
        formData.append('files', wholePhoto);

        const response = await axios.post<any[]>('/upload', formData, {
            headers: {
                Authorization: `Bearer ${loggedInJwt}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200 && response.data.length > 0) {
            const fileId = response.data[0].id;
            return fileId;
        } else {
            console.error('Error uploading image:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}


interface ImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
}

interface ImageAttributes {
    id: number;
    attributes: {
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: {
            thumbnail: ImageFormat;
            small: ImageFormat;
            medium: ImageFormat;
            large: ImageFormat;
        };
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: string | null;
        provider: string;
        provider_metadata: any; // You might want to define a type for provider_metadata
        createdAt: string;
        updatedAt: string;
    }
}

interface UserData {
    id: number;
    attributes: {
        username: string;
        email: string;
        provider: string;
        confirmed: boolean;
        blocked: boolean;
        createdAt: string;
        updatedAt: string;
    };
}

export interface Data {
    id: number;
    attributes: {
        Caption: string | null;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        Image: {
            data: ImageAttributes[] | null;
        };
        user: {
            data: UserData | null;
        };
    };
}

interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

interface Meta {
    pagination: Pagination;
}

interface ApiResponse {
    data: Data[];
    meta: Meta;
}


export const fetchPosts = async (userId?: number) => {
    let url = '/posts?populate=*'
    if (userId) {
        url = `${url}&filters[user][id][$eq]=${userId}`
    }
    const response = await axios.get<{ data: Data[] }>(url, { headers: { Authorization: `Bearer ${loggedInJwt}` } });
    return response.data.data
};

export const updateUser = async (userId: number, updates: Partial<LoggedInUser>) => {
    const response = await axios.put<LoggedInUser>(`/users/${userId}`, updates, { headers: { Authorization: `Bearer ${loggedInJwt}` } });
    return response.data
}
