import { ArrowLeft } from "react-feather"
import Router from "next/router"

export const GoBack = ({label})=>{


    return(
        <>
        <span>
            <span id="goback" onClick={()=>Router.back()}>
                <span className="arrow"><ArrowLeft strokeWidth={1}/></span>
                <span className="label">{label}</span>
            </span>
        </span>
        <style jsx>{`
            #goback{
                color:var(--muted);
                display:inline-flex;
                align-items:center;
                gap:10px;
                margin-bottom:20px;
                cursor:pointer;
                transition: color 300ms;
            }

            #goback:hover{
                color:var(--blue);
            }

            #goback span{
                font-size:14px;
            }
        
        `}</style>
        
        </>
    )
}