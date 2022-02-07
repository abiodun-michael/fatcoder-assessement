

const EmailInput = ({label,error,...rest})=>{
   
    
        return(
            <>
            <div className="input-wrapper">
                <label>{label}</label>
                <input type="email"
                    pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" className="input" {...rest}/>
                {
                    error ?  <span className="error">Error message here</span>:null
                }
               
            </div>
            <style jsx>{`
                input{
                    display:block;
                    outline:none;
                    height:40px;
                    border:1px solid var(--border-color);
                    width:100%;
                    border-radius:5px;
                    padding: 0 15px;
                    color:var(--muted);
                    font-size:1rem;
                }
    
                input::placeholder{
                    color:var(--muted);
                    font-size:1rem;
                }
    
                .input-wrapper{
                    margin-top:30px;
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
                }
                
    
                
            
            `}</style>
            </>
        )
    }
    
    export default EmailInput