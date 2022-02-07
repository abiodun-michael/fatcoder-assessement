import Spinner from "../spinner"


const Button = ({children, loading=false,type,htmlType="button",block, ...rest})=>{


    return(
        <>
        <button type={htmlType} className={`btn ${type} ${loading ? 'loading':''}`} 
         {...rest}>{
            loading ? <Spinner style={{color:"white", fontSize:16}}/>:null
        
        }{children}</button>
        <style jsx>{`
           .btn{
            outline:2px solid transparent;
            border:1px solid transparent;
            border-radius:5px;
            padding:12px 38px;
            min-width:100px;
            width:${block ? '100%':'auto'};
            font-size:14px;
            display:flex;
            gap:5px;
            transition: all 300ms;
            
           }

           button:hover:not(:disabled), button:active:not(:disabled){
               outline-color: var(--blue);
           }

           .error{
               background:transparent;
               color:var(--red);
           }

           .ghost:not(:disabled){
                background:transparent;
                border:1px solid var(--blue);
                cursor:pointer;
                color:var(--blue)
           }

           .primary:not(:disabled){
               background:var(--blue-gradient);
               color:var(--page-bg);
               cursor:pointer;
           }

           .loading{
                outline:none;
                cursor:none;
           }
        
        `}</style>
        </>
    )
}

export default Button