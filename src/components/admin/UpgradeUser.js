import React, {useState} from 'react'
import{Link} from 'react-router-dom'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import{ButtonComponent, InputField} from '../FormComponents'
import {upgradeApi} from '../../services/api/userApi'
import ModalPage from '../ModalPage'

const UpgradeUser = ({setShowUpgrade, submitting, setSubmitting}) => {
    const [openModal, setOpenModal]= useState(false) //controls if modal will be displayed
    const [styleProp, setStyleProp]=useState() //sets modal style background as red or green depending on 'error' or 'success' response
    const [response, setResponse]= useState() //sets message in modal

    const upgradeInit={username:'', password:''}
    const upgradeSchema= Yup.object({
        username: Yup.string().required('username to be upgraded is required')
                    .min(4)
                    .max(40)
                    //regex to only allow these charactes through
                    .matches(/^[ a-zA-Z0-9~!@$^*()_+={}:;.]+$/, 'username can only contain letters, numbers and special characters ~!@$^*()_+={}:;.'),
        password: Yup.string().required('admin password is required')
                    .min(4)
                    .max(12)
                    .matches(/^[a-zA-Z0-9!@#$*+=:.]+$/, 'password can only contain letters, numbers and special characters !@#$*+=:.')
    })
    const upgradeSubmit=async(values, onSubmitProps)=>{
        setSubmitting(true)
        const result = await upgradeApi(values)
        if(result===200){
            setResponse('successfully upgraded username')
            setStyleProp('Success') //sets a green success background for modal
        } else{
            setResponse(result)
            setStyleProp('Error') //sets a red error bacground for modal
        }
        setOpenModal(true)
        onSubmitProps.resetForm()
        setSubmitting(false)
    }
    return (
    <>
        <ModalPage openModal={openModal} setOpenModal={setOpenModal} styleProp={styleProp} message={response} />
        <Formik initialValues={upgradeInit} validationSchema={upgradeSchema} onSubmit={upgradeSubmit}>
            {
                formik=>(
                    <Form>
                        <InputField name={'username'} label={'Username to upgrade:'} type={'text'} placeholder={'username to be upgraded as admin'} />
                        <InputField name={'password'} label={'Admin password:'} type={'password'} placeholder={'your admin password'} />
                        <ButtonComponent type={'submit'} disabled={submitting} label={submitting?'please wait...': 'Upgrade username'} />
                        <Link onClick={()=>setShowUpgrade(false)} to='#'>Hide form</Link>
                    </Form>
                )
            }
        </Formik>
    </>
    )
}

export default UpgradeUser