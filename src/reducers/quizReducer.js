const quizReducer=(state=[], action)=>{
    switch(action.type){
        case 'ADD':
            return [action.payload, ...state]
        case 'FETCH':
            return action.payload
        case 'DELETE':
            return state.filter(item=> item.id!==Number(action.payload)) //removes an item when the id matches
        default:
            return state
    }
}
export default quizReducer;