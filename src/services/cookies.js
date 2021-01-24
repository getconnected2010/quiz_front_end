import Cookies from 'universal-cookie';

const cookie= new Cookies();

export const assignTknCkie=async(data)=>{
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
        cookie.remove('currentToken')
    } catch (error) {
        alert('error removing cookies from your browser')
    }
}