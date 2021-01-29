import {useState} from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import {ButtonComponent, InputField} from '../FormComponents'
import {updatePasswordApi} from '../../services/api/userApi'
import { Link } from 'react-router-dom'
import ModalPage from '../ModalPage'


const ChangeMyPswrd = ({submitting, setSubmitting, setHidePasswordForm}) => {
    //sets modal props of open/close, error/success style, text displayed as response
    const [openModal, setOpenModal]= useState(false)
    const [styleProp, setStyleProp]=useState()
    const [response, setResponse]= useState()
    const initialValuesPass={password:'', newPassword:'', confirm:''}
    const validationSchemaPass= Yup.object({
        password: Yup.string().required('Required')
                    .min(4)
                    .max(12)
                     //regex to only allow these charactes through
                    .matches(/^[a-zA-Z0-9!@#$*+=:.]+$/, 'password can only contain letters, numbers and special characters !@#$*+=:.'),
        
        newPassword: Yup.string().required('Required')
                    .min(6)
                    .max(12)
                    //regex to enforce atleast one character from each range
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$*+=:.])/, 'password must contain lower case letter, upper case letter, number and special character from !@#$*+=:.')
                    //regex to limit options from within these characters
                    .matches(/^[a-zA-Z0-9!@#$*+=:.]+$/, 'password can only contain letters, numbers and special characters from !@#$*+=:.'),

        confirm: Yup.string().required('Required').oneOf([Yup.ref('newPassword'),''], "passwords don't match") //matches password inputs
    })
    const updatePassword=async(values, onSubmitProps)=>{
        setSubmitting(true)
        const result = await updatePasswordApi(values)
        if(result===200){
            setResponse('successfully upgdated password') //sets a green success background for modal
            setStyleProp('Success')
        } else{
            setResponse(result)
            setStyleProp('Error') //sets a red error bacground for modal
        }
        onSubmitProps.resetForm()
        setOpenModal(true)
        setSubmitting(false)
    }
    return (
        <>
            <ModalPage openModal={openModal} setOpenModal={setOpenModal} message={response} styleProp={styleProp}/>
            <Formik initialValues={initialValuesPass} validationSchema={validationSchemaPass} onSubmit={updatePassword}>
                    {
                        formik=>(
                            <Form >
                                <InputField name={'password'} label={'Current Password:'} type={'password'} placeholder={'enter current password'} />
                                <InputField name={'newPassword'} label={'New Password: '} type={'password'} placeholder={'enter new password'} />
                                <InputField name={'confirm'} label={'Confirm new password:'} type={'password'} placeholder={'confirm new password'} />
                                <ButtonComponent disabled={submitting} type={'submit'} label={submitting?'please wait...':'update password'} />
                                <Link to='#' onClick={()=>setHidePasswordForm(true)}>Hide form</Link>
                            </Form>
                        )
                    }
            </Formik>
        </>
    )
}

export default ChangeMyPswrd