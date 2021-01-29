import axios from 'axios'
import {assignTknCkie, getTknCkie, removeTknCkie} from '../../services/cookies'

//axios configurations to be used with all api calls
let url
//if in dev, url will be localhost. if in production, server domain url
if (process.env.NODE_ENV==='production') {
    url='https://node-quiz-backend.herokuapp.com'
} else {
    url= 'http://localhost:8000'
}

export const axiosInstance= axios.create({
    baseURL: url,  //sets up a url for all api calls
    withCredentials: true //sends cookies with each request. add  res.header({'Access-Control-Allow-Credentials':true}) server side.
})

//a request interceptors which attaches an authorization header jwt token to each request
axiosInstance.interceptors.request.use(async(req)=>{
    const userToken = await getTknCkie()
    if(userToken){
         //.common will attach header to all api calls, but .post will attach header to all post api calls only
        req.headers.common['Authorization'] = `${userToken}`
    }
    return req //have to return req or else it will hang
})

//a response interceptor checks for new token in the header and errors
axiosInstance.interceptors.response.use(async(res)=>{
    //to access res.headers in axios, add res.header({'Access-Control-Expose-Headers':'userToken'}) in backend inside index.js
    if(res.headers.usertoken){
        await assignTknCkie(res.headers.usertoken) //updates the current cookie with the new usertoken received
    }
    return res //have to return res or else it will hang
    //interceptor for errors
    },async (error)=>{
        //checks if response error has 401 status and redirects to login page
        if(error&&error.response&&error.response.status===401){
            removeTknCkie()
            setTimeout(() => {  //waits 5 seconds before redirecting to 'login' page so user can read incoming error message
                window.location.href= 'login'  //universal js fn to redirect
            }, 5000);
        }
        //checks presence of userTokens in current browser after an error response to see if there is a logged user.
        //if no tokens, then redirects to login page
        if(error){
            const user = await getTknCkie()
            if(user===undefined|| user.user_id===null){
                setTimeout(() => {
                    window.location.href= 'login'
                }, 5000);
            }
        }
        return Promise.reject(error)  //has to return error or else server error messages will not make it to the front end component
    }
)