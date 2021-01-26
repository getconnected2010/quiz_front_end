import jwtDecode from 'jwt-decode'
import{getTknCkie} from '../cookies'
import {axiosInstance} from './axiosConfig'

export const addToListApi=async(data)=>{
    try {
        const result = await axiosInstance.post(`/quiz/add`, data, {withCredentials: true})
        if(result.status===200) return result
        return 'error adding question to database'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error adding question to database'
    }
}

export const deleteQaApi =async(data)=>{
    try {
        return await axiosInstance.delete(`/quiz/delete/${data}`, {withCredentials: true}, {headers: {"Content-type":"application/json"}}) 
    } catch (error) {
        console.log(error)
        if(error.response&&error.response.data.msg) return error.response.data.msg
        return 'error deleting question'
    }
}

export const fetchQuizApi =async(subject)=>{
    try {
        return await axiosInstance.get(`/quiz/list/${subject}`, {withCredentials: true})
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error fetching questions from database'
    }
}

export const fetchMyScoresApi=async()=>{
    try {
        const result= await axiosInstance.get(`/quiz/scores`, {withCredentials: true})
        if(result&& result.data && result.data.result) return result.data.result 
        return 'error retrieving scores'
    } catch (error){
        console.log(error.response.data.msg)
        if(error.response && error.response.data.msg) return error.response.data.msg
        return 'error retrieving scores'
    }
}

export const recordScoreApi=async(data)=>{
    const userToken = await getTknCkie()
    if(userToken){
        try {
            const result = await axiosInstance.post(`/quiz/score`, data, {withCredentials: true})
            return result
        } catch (error) {
            if(error.response && error.response.data.msg) return error.response.data.msg
            return 'error recording your score'
        }
    }
}