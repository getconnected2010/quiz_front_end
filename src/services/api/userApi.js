import {axiosInstance} from './axiosConfig'
import{removeTknCkie} from '../cookies'

//admin can fetch any user's score fn
export const adminFetchScoreApi=async(data)=>{
    try {
        const {username} = data
        const result= await axiosInstance.get(`/user/admin/scores/${username}`)
        if(result && result.data.result) return result.data.result
        return 'error fetching scores'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error fetching scores'
    }
}

//admin can delete a user off database
export const delUserApi= async(data)=>{
    try {
        const result = await axiosInstance.post(`/user/admin/delete`, data)
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
        return 'error deleting username'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error deleting username'
    }
}

//admin remove an admin priviledge of another user
export const dnGradeApi= async(data)=>{
    try {
        const result= await axiosInstance.post(`/user/admin/dngrade`, data)
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
        return 'error down grading username'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error down grading username'
    }
}

//reset a forgotten password
export const resetPasswordApi= async(data)=>{
    try {
        const response = await axiosInstance.post(`/user/self/reset`, data)
        if(response.status===200) return response.status
        if(response.data.msg) return response.data.msg
    } catch (error) {
        if(error.response && error.response.data.msg) return error.response.data.msg
        return 'error resetting password'
    }
}

export const signInApi=async (data)=>{
    try {
        const response= await axiosInstance.post(`/user/signin`, data) 
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
        await axiosInstance.get(`/user/signout`)
        removeTknCkie()
        return
    } catch (error) {
        removeTknCkie()
        return
    }
}

export const signUpApi=async(data)=>{
    try {
        const result= await axiosInstance.post(`/user/signup`, data)
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
    } catch (error) {
        if(error.response&& error.response.data.msg)return error.response.data.msg
        return 'error signing you up'
    }
}

//admin can reset a user who got locked out for multiple incorrect password entries
export const resetApi=async(data)=>{
    try {
        const result = await axiosInstance.post(`/user/admin/reset`, data)
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
        const result = await axiosInstance.post(`/user/update/password`, data)
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error updating password'
    }
}

export const updateUsernameApi=async(data)=>{
    try {
        const result= await axiosInstance.post(`/user/update/username`, data)
        if(result.status===200)return result.status
        if(result.data.msg) return result.data.msg
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error updating username'
    }
}

//admin can give admin priviledge to another user
export const upgradeApi= async(data)=>{
    try {
        const result= await axiosInstance.post(`/user/admin/upgrade`, data)
        if(result.status===200) return result.status
        if(result.data.msg) return result.data.msg
        return 'error upgrading username'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error upgrading username'
    }
}