import jwtDecode from 'jwt-decode'
import {axiosInstance} from './axiosConfig'
import{removeTknCkie, getTknCkie} from '../cookies'

export const adminFetchScoreApi=async(data)=>{
    try {
        const userToken = await getTknCkie()
        const user_id= await jwtDecode(userToken).user_id
        const {username} = data
        if(!userToken||user_id===null) return 'invalid tokens'
        const result= await axiosInstance.get(`/user/admin/scores/${user_id}/${username}/${userToken}`, {withCredentials: true, credentials: 'include'})
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
        const result = await axiosInstance.post(`/user/admin/delete/${userToken}`, data, {withCredentials: true})
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
        const result= await axiosInstance.post(`/user/admin/dngrade/${userToken}`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
        return 'error down grading username'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error down grading username'
    }
}

export const resetPasswordApi= async(data)=>{
    try {
        const response = await axiosInstance.post(`/user/self/reset`, data, {withCredentials: true})
        if(response.status===200) return response.status
        if(response.data.msg) return response.data.msg
    } catch (error) {
        if(error.response && error.response.data.msg) return error.response.data.msg
        return 'error resetting password'
    }
}

export const signInApi=async (data)=>{
    try {
        const response= await axiosInstance.post(`/user/signin`, data, {withCredentials:true}) 
        //console.log(response.headers.usertoken)
        if(response.status===200) return response.data
        return 'error logging you in'
    }catch(error){
        console.log(error)
        removeTknCkie()
        if (error.response && error.response.data) return error.response.data.msg
        return 'error logging you in'
    }
}

export const signoutApi=async()=>{
    try {
        const result = await axiosInstance.get(`/user/signout`, {withCredentials: true})
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
        const result= await axiosInstance.post(`/user/signup`, data, {withCredentials: true})
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
        const result = await axiosInstance.post(`/user/admin/reset/${userToken}`, data, {withCredentials: true})
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
        const result = await axiosInstance.post(`/user/update/password/${userToken}`, data, {withCredentials: true})
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
        const result= await axiosInstance.post(`/user/update/username/${userToken}`, data, {withCredentials: true})
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
        const result= await axiosInstance.post(`/user/admin/upgrade/${userToken}`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
        return 'error upgrading username'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error upgrading username'
    }
}