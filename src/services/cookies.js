import Cookies from 'universal-cookie';

const cookie= new Cookies();

export const assignTknCkie=async(data)=>{
    try {
        cookie.set('userToken', data, {
            maxAge: 60*30,   //in seconds
            httpOnly: false,
            secure: process.env.NODE_ENV==='production'? true: false
        })
    } catch (error) {
        alert('error assigning cookies to your session')
    }
}

export const getTknCkie=async ()=>{
    try {
        return await cookie.get('userToken')
    } catch (error) {
        return {user_id: null, admin: false}
    } 
}

export const removeTknCkie=()=>{
    try {
        cookie.remove('userToken')
    } catch (error) {
        alert('error removing cookies from your browser')
    }
}