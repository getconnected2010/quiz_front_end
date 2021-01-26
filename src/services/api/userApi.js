import {axiosInstance} from './axiosConfig'
import{removeTknCkie} from '../cookies'

export const adminFetchScoreApi=async(data)=>{
    try {
        const {username} = data
        const result= await axiosInstance.get(`/user/admin/scores/${username}`, {withCredentials: true, credentials: 'include'})
        if(result && result.data.result) return result.data.result
        return 'error fetching scores'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error fetching scores'
    }
}

export const delUserApi= async(data)=>{
    try {
        const result = await axiosInstance.post(`/user/admin/delete`, data, {withCredentials: true})
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
        const result= await axiosInstance.post(`/user/admin/dngrade`, data, {withCredentials: true})
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
        await axiosInstance.get(`/user/signout`, {withCredentials: true})
        removeTknCkie()
        return
    } catch (error) {
        removeTknCkie()
        return
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
        const result = await axiosInstance.post(`/user/admin/reset`, data, {withCredentials: true})
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
        const result = await axiosInstance.post(`/user/update/password`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error updating password'
    }
}

export const updateUsernameApi=async(data)=>{
    try {
        const result= await axiosInstance.post(`/user/update/username`, data, {withCredentials: true})
        if(result.status===200)return result.status
        if(result.data.msg) return result.data.msg
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error updating username'
    }
}

export const upgradeApi= async(data)=>{
    try {
        const result= await axiosInstance.post(`/user/admin/upgrade`, data, {withCredentials: true})
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
        return 'error upgrading username'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error upgrading username'
    }
}