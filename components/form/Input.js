

const Input = ({label,name,rules,errors,register,watch:myWatch, type="text",...rest})=>{

 
   
    return(
        <>
        <div className="input-wrapper">
            <label htmlFor={name}>{label}</label>
            <input className={errors?.[name] ? '_error':''}  type={type} {...register(name,{...rules,
            pattern: {
                value: type == "email" ? /\S+@\S+\.\S+/ :
                        type =="tel" ? /^\+(?:[0-9] ?){6,14}[0-9]$/:"",
                message: type == "email" ? "Invalid email format":
                        type == "tel" ? "Invalid phone number format":""
                        
              }})} autoComplete="off" {...rest}/>
            <span className={`error ${errors?.[name] ? 'show-error':''}`}>{errors?.[name]?.message}</span>
            
           
        </div>
        <style jsx>{`
            input{
                display:block;
                outline:none;
                height:45px;
                border:1px solid var(--border-color);
                width:100%;
                border-radius:5px;
                padding: 0 15px;
                color:var(--muted);
                font-size:1rem;
                transition: border 300ms;
            }

            input::placeholder{
                color:var(--muted);
                font-size:1rem;
            }

            .input-wrapper{
                margin-top:30px;
                position:relative;
            }

            .input-wrapper label{
                font-size:14px;
                color:var(--muted)
            }

            input:focus{
                border-color:var(--blue);
            }

            .error{
                display:inline-block;
                color:var(--red);
                font-size:1rem;
                margin-top:5px;
                position:absolute;
                top:calc(100% - 1rem);
                opacity:0;
                transition: all 300ms;
            }

            ._error{
                border-color:var(--red);
            }
            
            .show-error{
                opacity:1;
                top:100%;
            }

            
        
        `}</style>
        </>
    )
}

export default Input