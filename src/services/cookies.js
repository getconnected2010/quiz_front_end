import Cookies from 'universal-cookie';
import jwt from 'jwt-decode'

const cookie= new Cookies();

export const assignCookie=async(data)=>{
    try {
        cookie.set('userToken', data.userToken, {
            maxAge: 60*30,   //in seconds
            httpOnly: false,
            //needs to be secure for production
            secure: false
        })
    } catch (error) {
        alert('error assigning cookies to your session')
    }
}

export const fetchCookie=async ()=>{
    try {
        const userJwt= await cookie.get('userToken')
        const user=  jwt(userJwt)
        return user
    } catch (error) {
        return {user_id: null, admin: false}
    } 
}
export const userTokenCookie=async()=>{
    try {
        const userToken = await cookie.get('userToken')
        return userToken
    } catch (error) {
        return null
    }
}
export const removeCookie=()=>{
    try {
        cookie.remove('userToken')
    } catch (error) {
        alert('error removing cookies from your browser')
    }
}