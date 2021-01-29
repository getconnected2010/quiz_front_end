import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {Form, Formik} from 'formik'
import {signInAction} from '../actions/userActions'
import {signInApi} from '../services/api/userApi'
import {InputField, ButtonComponent} from './FormComponents'
import ModalPage from './ModalPage';

const Signin=()=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const [openModal, setOpenModal] = useState(false)
    const [response, setResponse] = useState()
    const [styleProp, setStyleProp] = useState()
    const initialValues={username:'', password:''}
    const validationSchema= Yup.object({
        username: Yup.string().required('please enter username')
                    .min(4)
                    .max(40)
                    .matches(/^[ a-zA-Z0-9~!@$^*()_+={}:;.]+$/, 'Only letters, numbers and special characters ~!@$^*()_+={}:;. allowed'),
        password: Yup.string().required('please enter password')
                    .min(4)
                    .max(12)
                    .matches(/^[a-zA-Z0-9!@#$*+=:.]+$/, 'Only letters, numbers and special characters !@#$*+=:. allowed')
    })
    const handleSubmit=async(values, onSubmitProps)=>{
        const result = await signInApi(values)
        onSubmitProps.resetForm()
        if(typeof(result)==='object'&&result!==null){
            dispatch(signInAction())
            history.push('/')
        }else{
            setResponse(result)
            setStyleProp('Error')
            setOpenModal(true)
        }
    }
    return(
        <>
        <ModalPage openModal={openModal} setOpenModal={setOpenModal} message={response} styleProp={styleProp} />
        <Formik initialValues={initialValues} validationSchema={validationSchema}
        onSubmit={handleSubmit}>
            {
                formik=>(
                    <div className="Form">
                        <h1>Sign In</h1>
                        <Form>
                            <InputField label={'User name: '} name={'username'} type={'text'} placeholder={'username'} />

                            <InputField label={'Password: '} name={'password'} type={'password'} placeholder={'password'} />

                            <ButtonComponent type={'submit'} disabled={formik.isSubmitting} label={formik.isSubmitting?<>Loggin you in</>:<>Login</>} />
                            
                            <span>
                                Sign in with an admin account to add to quiz.
                                <br/>
                                Forgot password or reset account? Click <Link style={{color:'green', fontSize:'1.25em'}} to='/reset'>here</Link>.
                            </span>
                        </Form>
                    </div>
                )
            }
        </Formik>
        </>
    )
}
export default Signin