import React, { forwardRef,memo } from 'react'
import { useForm } from "react-hook-form"



const Form = forwardRef(({initialValues={},children,onFinish=()=>{}},ref)=>{
    const {handleSubmit,register,watch, formState:{errors}} = useForm({
        defaultValues:initialValues,
    })
    
  

    return(
        <>
        <form ref={ref} onSubmit={handleSubmit(onFinish)}>
            {React.Children.map(children, child => {
            return child.props.name
            ? React.createElement(child.type, {
                ...{
                    ...child.props,
                    register: register,
                    key: child.props.name,
                    errors,
                    watch
                }
                })
            : child;
        })}
        </form>
        </>
    )
})

export default Form