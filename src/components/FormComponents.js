import React from 'react'
import {Field, ErrorMessage} from 'formik'

//reusable button component
export const ButtonComponent=({type, id, label, disabled, onClick, style})=>{
    return(
        <button type={type} id={id} disabled={disabled} onClick={onClick} style={style}>{label}</button>
    )
}

//reusable input component with an error message displayed in red color
export const InputField=({label, name, type, placeholder})=>{
    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name} type={type} placeholder={placeholder} />
            <span style={{color:'red'}}><ErrorMessage name={name} /></span>
        </div>
    )
}

//reusable input component with an error message displayed in red color
export const SelectField=({label, name, selectOptions})=>{
    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name} as='select'>
                {
                    selectOptions.map(option=>(
                        <option value={option} key={option} >{option}</option>
                    ))
                }
            </Field>
            <span style={{color:'red'}}><ErrorMessage name={name} /></span>
        </div>
    )
}