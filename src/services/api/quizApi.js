import axios from 'axios'
import jwtDecode from 'jwt-decode'
import{getTknCkie} from '../cookies'

let url
if (process.env.NODE_ENV==='production') {
    url='https://node-quiz-backend.herokuapp.com'
} else {
    url= 'http://localhost:8000'
}

export const addToListApi=async(data)=>{
    try {
        const userToken = await getTknCkie()
        //const user = await userProfileCookie()
        const user_id= await jwtDecode(userToken).user_id
        data.user_id= user_id
        if(!userToken||data.user_id===null) return 'invalid tokens'
        const result = await axios.post(`${url}/quiz/add/${userToken}`, data, {withCredentials: true})
        if(result.status===200) return result
        return 'error adding question to database'
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error adding question to database'
    }
}

export const deleteQaApi =async(data)=>{
    try {
        const userToken = await getTknCkie()
        //const user = await userProfileCookie()
        const user_id= jwtDecode(userToken).user_id
        //const user_id= user.user_id
        if(!userToken||data.user_id===null) return 'invalid tokens'
        return await axios.delete(`${url}/quiz/delete/${data}/${user_id}/${userToken}`, {withCredentials: true}, {headers: {"Content-type":"application/json"}}) 
    } catch (error) {
        console.log(error)
        if(error.response&&error.response.data.msg) return error.response.data.msg
        return 'error deleting question'
    }
}

export const fetchQuizApi =async(subject)=>{
    try {
        return await axios.get(`${url}/quiz/list/${subject}`, {withCredentials: true})
    } catch (error) {
        if(error.response&& error.response.data.msg) return error.response.data.msg
        return 'error fetching questions from database'
    }
}

export const fetchMyScoresApi=async()=>{
    const userToken = await getTknCkie()
    //const user= await userProfileCookie()
    const user_id= jwtDecode(userToken).user_id
    //const user_id= user_id
    if(userToken && user_id!==null){
        try {
            const result= await axios.get(`${url}/quiz/scores/${user_id}/${userToken}`, {withCredentials: true})
            return result.data.result
        } catch (error){
            if(error.response && error.response.data.msg) return error.response.data.msg
            return 'error retrieving scores'
        }
    }
}

export const recordScoreApi=async(data)=>{
    const userToken = await getTknCkie()
    //const user= await userProfileCookie()
    const user_id= jwtDecode(userToken).user_id
    //const user_id= user.user_id
    if(userToken && user_id!==null){
        try {
            data.user_id= user_id
            const result = await axios.post(`${url}/quiz/score/${userToken}`, data, {withCredentials: true})
            return result
        } catch (error) {
            if(error.response && error.response.data.msg) return error.response.data.msg
            return 'error recording your score'
        }
    }
}