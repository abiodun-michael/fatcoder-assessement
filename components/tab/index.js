import React, { useState, useEffect } from "react"



const Tab = ({children,headers=[]})=>{

    const [activeTab, setActiveTab] = useState(0)


   

    return(
        <>
        <Header headers={headers} activeTab={activeTab} onSelect={(i)=>setActiveTab(i)}/>
       {
           React.Children.map(children,(child,i)=>(
               child.type == TabPane && activeTab == i ? child:null
           ))
       }
        </>
    )
}

export default React.memo(Tab)

export const TabPane = ({children})=>{


    return(
        <>{children}</>
    )
}


const Header = ({headers,activeTab,onSelect,...rest})=>{


    return(
        <>
            <ul className="tab-header">
                {
                    headers?.map((item, key)=>(
                        <li key={key} onClick={()=>onSelect(key)} className={activeTab == key ? 'active':0} {...rest}>{item}</li>

                    ))
                }
            </ul>


            <style jsx>{`
                ul.tab-header{
                    list-style-type:none;
                    padding:0;
                    display:flex;
                    gap:65px;
                    margin-bottom:30px;
                   
                }

                ul.tab-header li{
                    display:block;
                    position:relative;
                    color:var(--muted);
                    font-size:14px;
                    padding:10px 0;
                    transition:all .35s ease-in-out;
                    overflow:hidden;
                }


                ul.tab-header li.active,ul.tab-header li:hover{
                    color:var(--blue);
                }

                ul.tab-header li:not(.active){
                    cursor:pointer;
                }


                ul.tab-header li::after{
                    position:absolute;
                    content:" ";
                    height:2px;
                    bottom:0;
                    left:0;
                    width:100%;
                    background:var(--blue-gradient);
                    transform: translate(-100%);
                    transition: transform 300ms;
                }

                ul.tab-header li.active::after, ul.tab-header li:hover::after{
                    transform: translate(0,0);
                }
            
            `}</style>
        </>
    )
}