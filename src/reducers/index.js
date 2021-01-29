import{combineReducers} from 'redux'
import quizReducer from './quizReducer'
import userReducer from './userReducer'

//imports all reducers and combines them
export default combineReducers({
    qa: quizReducer, 
    user: userReducer
})