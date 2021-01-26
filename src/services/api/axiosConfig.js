import axios from 'axios'
import {assignTknCkie, getTknCkie, removeTknCkie} from '../../services/cookies'

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
    },async (error)=>{
        //checks if response error has 401 status and redirects to login page
        if(error&&error.response&&error.response.status===401){
            removeTknCkie()
            setTimeout(() => {
                window.location.href= 'login'
            }, 3000);
        }
        if(error.response.data.msg){
            alert(error.response.data.msg)
        }
        //checks presence of userTokens after an error response then redirects to login page if no tokens
        if(error){
            const user = await getTknCkie()
            if(user===undefined|| user.user_id===null){
                setTimeout(() => {
                    window.location.href= 'login'
                }, 2000);
            }
        }
    }
)