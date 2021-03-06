import {useState} from 'react'
import {ButtonComponent} from '../FormComponents'
import {fetchMyScoresApi } from '../../services/api/quizApi'
import ModalPage from '../ModalPage'

const MyScores = ({submitting, setSubmitting, setScores}) => {
    const [openModal, setOpenModal]= useState(false)
    const [styleProp, setStyleProp]=useState()
    const [response, setResponse]= useState()
    const fetchScores= async()=>{
        setSubmitting(true)
        const result = await fetchMyScoresApi()
        if(Array.isArray(result)){ //checks if api response was an array. if array, success placed into table.
            setScores(result)
        }else{                      //if api response is a string, its error and set into modal message
            setResponse(result)
            setStyleProp('Error')
            setOpenModal(true)
        }
        setSubmitting(false)
    }
    return (
        <>
            <ModalPage openModal={openModal} setOpenModal={setOpenModal} message={response} styleProp={styleProp}/>
            <ButtonComponent disabled={submitting} onClick={fetchScores} label={submitting?'please wait...':'Get my scores'} />
        </>
    )
}

export default MyScores