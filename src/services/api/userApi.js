import axios from 'axios'
import jwtDecode from 'jwt-decode'
import{removeTknCkie, getTknCkie} from '../cookies'


let url
if (process.env.NODE_ENV==='production') {
    url='https://node-quiz-backend.herokuapp.com'
} else {
    url= 'http://localhost:8000'
}

axios.defaults.headers.common['Authorization']= 'mockUserToken'

export const adminFetchScoreApi=async(data)=>{
    try {
        const userToken = await getTknCkie()
        const user_id= await jwtDecode(userToken).user_id
        const {username} = data
        if(!userToken||user_id===null) return 'invalid tokens'
        const result= await axios.get(`${url}/user/admin/scores/${user_id}/${username}/${userToken}`, {withCredentials: true, credentials: 'include'})
        if(result && result.data.result) return result.data.result
        return 'error fetching scores'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error fetching scores'
    }
}

export const delUserApi= async(data)=>{
    try {
        const userToken = await getTknCkie()
        const user_id = await jwtDecode(userToken).user_id
        data.user_id = user_id
        if(!userToken|| data.user_id===null) return 'invalid tokens'
        const result = await axios.post(`${url}/user/admin/delete/${userToken}`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
        return 'error deleting username'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error deleting username'
    }
}

export const dnGradeApi= async(data)=>{
    try {
        const userToken = await getTknCkie()
        const user_id= await jwtDecode(userToken).user_id
        data.user_id = user_id
        if(!userToken||data.user_id===null) return 'invalid tokens'
        const result= await axios.post(`${url}/user/admin/dngrade/${userToken}`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
        return 'error down grading username'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error down grading username'
    }
}

// export const refreshTokenApi=async()=>{
//     try {
//         const userToken = await getTknCkie()
//         if(!userToken) return
//         const response = await axios.get(`${url}/user/refresh/${userToken}`)
//         if(typeof(response)==='object'&& response!==null) return assignTknCkie(response.data)
//         removeTknCkie()
//     } catch (error) {
//         removeTknCkie()
//     }
// }

export const resetPasswordApi= async(data)=>{
    try {
        const response = await axios.post(`${url}/user/self/reset`, data, {withCredentials: true})
        if(response.status===200) return response.status
        if(response.data.msg) return response.data.msg
    } catch (error) {
        if(error.response && error.response.data.msg) return error.response.data.msg
        return 'error resetting password'
    }
}

export const signInApi=async (data)=>{
    try {
        const response= await axios.post(`${url}/user/signin`, data, {withCredentials:true})
        if(response.status===200) return response.data
        return 'error logging you in'
    }catch(error){
        removeTknCkie()
        if (error.response && error.response.data) return error.response.data.msg
        return 'error logging you in'
    }
}

export const signoutApi=async()=>{
    try {
        const result = await axios.get(`${url}/user/signout`, {withCredentials: true})
        if(result.status===200){
            removeTknCkie()
            return result.status
        } else {
            removeTknCkie()
            return result.data.msg
        }
    } catch (error) {
        removeTknCkie()
        if(error.response && error.response.data) return error.response.data.msg
        return 'error logging you out. If error persists, contact admin.'
    }
}

export const signUpApi=async(data)=>{
    try {
        const result= await axios.post(`${url}/user/signup`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
    } catch (error) {
        if(error.response&& error.response.data.msg)return error.response.data.msg
        return 'error signing you up'
    }
}

export const resetApi=async(data)=>{
    try {
        const userToken = await getTknCkie()
        const user_id = await jwtDecode(userToken).user_id
        data.user_id= user_id
        if(!userToken||data.user_id===null) return 'invalid tokens'
        const result = await axios.post(`${url}/user/admin/reset/${userToken}`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
        return 'error unflagging username'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error unflagging username'
    }
}

export const updatePasswordApi=async(data)=>{
    try {
        const userToken = await getTknCkie()
        const user_id= jwtDecode(userToken).user_id
        data.user_id = user_id
        if(!userToken||data.user_id===null) return 'invalid tokens'
        const result = await axios.post(`${url}/user/update/password/${userToken}`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error updating password'
    }
}

export const updateUsernameApi=async(data)=>{
    try {
        const userToken = await getTknCkie()
        const user_id= await jwtDecode(userToken).user_id
        data.user_id = user_id
        if(!userToken||data.user_id===null) return 'invalid tokens'
        const result= await axios.post(`${url}/user/update/username/${userToken}`, data, {withCredentials: true})
        if(result.status===200)return result.status
        if(result.data.msg) return result.data.msg
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error updating username'
    }
}

export const upgradeApi= async(data)=>{
    try {
        const userToken = await getTknCkie()
        const user_id= await jwtDecode(userToken).user_id
        data.user_id = user_id
        if(!userToken||data.user_id===null) return 'invalid tokens'
        const result= await axios.post(`${url}/user/admin/upgrade/${userToken}`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
        return 'error upgrading username'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error upgrading username'
    }
}