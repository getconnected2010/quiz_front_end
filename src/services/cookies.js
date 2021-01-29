import Cookies from 'universal-cookie';

const cookie= new Cookies();

//receives a jwt token from server and assigns it in cookie to persist user
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

//retrieves stored jwt token off cookie to identify current user
export const getTknCkie=async ()=>{
    try {
        return await cookie.get('userToken')
    } catch (error) {
        return {user_id: null, admin: false}
    } 
}

//removes stored cookie tokens. usually called on logout and 401 status code from server
export const removeTknCkie=()=>{
    try {
        cookie.remove('userToken')
    } catch (error) {
        alert('error removing cookies from your browser')
    }
}