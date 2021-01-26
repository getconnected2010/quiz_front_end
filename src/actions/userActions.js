import jwtDecode from 'jwt-decode'
import {getTknCkie, removeTknCkie} from '../services/cookies'

export const signInAction=()=>async(dispatch)=>{
    try {
        const userToken= await getTknCkie()
        const tokenPayload = await jwtDecode(userToken)
        const user= {user_id: tokenPayload.user_id, admin: tokenPayload.admin}
        dispatch({type:'SIGNIN', payload: user}) 
    } catch (error) {
        dispatch({type: 'SIGNOUT'})
        removeTknCkie()
    } 
}

export const signOutAction=()=>(dispatch)=>{
    try {
        dispatch({type: 'SIGNOUT'})
    } catch (error) {
        removeTknCkie()
        alert('error logging you out')
    }   
}