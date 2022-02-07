import { X } from "react-feather"
import Portal from "../portal"
import { memo } from "react"



const Drawer = ({children,label,width = 200, visible, closeOnMaskClick, onCancle=()=>{}})=>{


    return(
        <>
        <Portal>
        <div className={`mask ${visible ? 'show-mask':''}`} 
        onClick={closeOnMaskClick ? ()=>onCancle():null}/>
        <div className={`drawer ${visible ? 'open':''}`}>
            <Top label={label}  onClose={()=>onCancle()}/>
            <Content>{children}</Content>
        </div>
        </Portal>
        <style jsx>{`

            .mask{
                position:fixed;
                top:0;
                right:0;
                left:0;
                bottom:0;
                background-color:rgba(17, 17, 17, 0.2);;
                opacity:0;
                visibility:hidden;
            }
        
            .drawer{
                display:flex;
                flex-direction:column;
                background-color:#ffffff;
                position:fixed;
                padding:50px 50px 0 50px;
                top:0;
                bottom:0;
                width:${width}px;
                right:0;
                transform: translate(${width}px,0);
                transition: transform 300ms;
            }

            .open{
                transform:translate(0,0)
            }

            .show-mask{
                visibility:visible;
                opacity:1;
            }

            @media screen and (max-width:600px){
                .drawer{
                    width:100%;
                    padding:30px;
                }
            }

            @media screen and (max-width:600px){
                .drawer{
                    width:100%;
                }
            }
        `}</style>
        
        </>
    )
}

export default memo(Drawer)


const Top = ({label,onClose})=>{

    return(
        <>
        <div className="drawer-top">
            <h3>{label}</h3>
            <span className="hover">
                <X strokeWidth={1} 
                    size={24} 
                    onClick={()=>onClose()} 
                    style={{cursor:'pointer'}}/>
            </span>
        </div>

        <style jsx>{`
            .drawer-top{
                display:flex;
                justify-content:space-between;
                align-items:center;
            }

            
        
        `}</style>
        </>
    )
}


const Content = ({children})=>{


    return(
        <>
        <div className="body">
            {children}
        </div>
        <style jsx>{`
           .body{
               flex:1;
               overflow:auto;
               padding:10px 0;
           }

           .body::-webkit-scrollbar {
            width: 10px;
          }
        
        `}</style>
        </>
    )
}