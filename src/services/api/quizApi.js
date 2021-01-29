import{getTknCkie} from '../cookies'
import {axiosInstance} from './axiosConfig'

//adds a question/answer to database
export const addToListApi=async(data)=>{ 
    try {
        const result = await axiosInstance.post(`/quiz/add`, data)
        if(result.status===200) return result
        return 'error adding question to database'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error adding question to database'
    }
}

//deletes a question from database
export const deleteQaApi =async(data)=>{
    try {
        return await axiosInstance.delete(`/quiz/delete/${data}`)
    } catch (error) {
        console.log(error)
        if(error.response&&error.response.data.msg) return error.response.data.msg
        return 'error deleting question'
    }
}

//collects questions from database by subject
export const fetchQuizApi =async(subject)=>{
    try {
        return await axiosInstance.get(`/quiz/list/${subject}`)
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error fetching questions from database'
    }
}

export const fetchMyScoresApi=async()=>{
    try {
        const result= await axiosInstance.get(`/quiz/scores`)
        if(result&& result.data && result.data.result) return result.data.result 
        return 'error retrieving scores'
    } catch (error){
        console.log(error.response.data.msg)
        if(error.response && error.response.data.msg) return error.response.data.msg
        return 'error retrieving scores'
    }
}


//if there is a logged user, it automatically records score in database.
//if no logged user, it fn doesn't run
export const recordScoreApi=async(data)=>{
    const userToken = await getTknCkie()
    if(userToken){
        try {
            const result = await axiosInstance.post(`/quiz/score`, data)
            return result
        } catch (error) {
            if(error.response && error.response.data.msg) return error.response.data.msg
            return 'error recording your score'
        }
    }
}