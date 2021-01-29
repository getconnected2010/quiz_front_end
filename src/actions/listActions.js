//adds a question and answer from user input into redux state
//this avoids api call on every add to update redux state
export const addAction=(data)=>(dispatch)=>{
    try{
        dispatch({type: 'ADD', payload: data})
    }catch(error){
        alert('error with adding this question')
    }
}
//receives quiz list from an api call and updates redux state
export const fetchQuizAction=(data)=>async(dispatch)=>{
    try{
        dispatch({type:'FETCH', payload: data}) 
    } catch(error){
        alert ('error retrieving list of questions')
    }
}
//removes a question from redux state once a delete api call is successful
//this avoids another api call to update redux state
export const deleteAction= (data)=>async(dispatch)=>{
    try{
        dispatch({type: 'DELETE', payload: data})
    } catch(error){
        alert('error deleting this question')
    }
}