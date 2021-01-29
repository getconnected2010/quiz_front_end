import { Redirect, Route } from 'react-router-dom'
import {useSelector} from 'react-redux'

//creates a protected route available only if an admin is logged.
//wrap the specific routes in App.js
export const AdminOnly=({component: Component, ...rest})=>{
    const user = useSelector(state => state.user)
    const admin = user.admin
    const user_id= user.user_id
    return(
        <Route {...rest} render={(props)=>{
            if(user_id!==null && admin==='true') return <Component {...props} />
            if(user_id!==null && admin==='false') return <Redirect to='/' /> //if user isn't admin, redirect to home page
            if(user_id===null) return <Redirect to='/signin' /> //if no logged user, redirect to signin
        }} />
    )
}

//creates a protected route available only if there is a logged user.
//wrap specific routes in Appl.js
export const LoggedOnly=({component: Component, ...rest})=>{
    const user = useSelector(state=>state.user)
    const user_id = user.user_id
    return(
        <Route {...rest} render={(props)=>{
            if(user_id!==null) return <Component {...props} />
            if(user_id===null) return <Redirect to='/signin' /> //if not logged, redirect to login page
        }} />
    )
}

//creates a protected route available only in there is no logged user.
//wrap specific routes in App.js
export const UnloggedOnly =({component: Component, ...rest})=>{
    const user = useSelector(state=>state.user)
    const user_id= user.user_id
    return(
        <Route {...rest} render={(props)=>{
            if (user_id===null) return <Component {...props} />
            if(user_id!==null) return <Redirect to='/' />  //if there is a logged user, redirect to home page
        }}  />
    )
}