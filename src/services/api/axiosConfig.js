import axios from 'axios'
import {assignTknCkie, getTknCkie} from '../../services/cookies'

let url
if (process.env.NODE_ENV==='production') {
    url='https://node-quiz-backend.herokuapp.com'
} else {
    url= 'http://localhost:8000'
}

export const axiosInstance= axios.create({
    baseURL: url
})

axiosInstance.interceptors.request.use(async(req)=>{
    const userToken = await getTknCkie()
    if(userToken){
        req.headers.common['Authorization'] = `${userToken}`
    }
    return req
})

axiosInstance.interceptors.response.use(async(res)=>{
    if(res.headers.usertoken){
        await assignTknCkie(res.headers.usertoken)
    }
    return res
})


