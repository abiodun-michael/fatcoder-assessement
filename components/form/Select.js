import { useState, useRef, useEffect } from "react"



const Select = ({list=[],label,name,errors,watch:myWatch,rules,register,placeholder})=>{
  
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState("")

        const v = myWatch(name)

    const ref = useRef()

    const handleDefault = ()=>{
        const input = ref.current?.querySelector(`input[name=${name}]:checked`)?.value
        const index = list?.findIndex(el=>el.value == input)
        setSelected(list[index]?.label)
    }

    useEffect(()=>{
        handleDefault()

        return ()=>handleDefault()

    },[v])

    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false)
        }
    }

    useEffect(()=>{
        document.addEventListener("mousedown",handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[ref])

   

    return(
        <>
            <div  ref={ref} className="select-wrapper">
                <span className="label">{label}</span>
                <input className={errors?.[name] ? '_error':''} 
                placeholder={placeholder} defaultValue={selected} type="text" readOnly onClick={()=>setOpen(!open)}/>
                <div className={`select-list ${open ? 'selected':''}`}>
                   {
                       list?.map(({value, label},i)=>(
                        <div key={i}>
                            <input id={label} {...register(name, rules)}
                            type="radio" value={value}/>
                             <label htmlFor={label} className="option">
                                {label}
                            </label>
                        </div>
                       ))
                   }
                </div>
                <span className={`error ${errors?.[name] ? 'show-error':''}`}>{errors?.[name]?.message}</span>
            </div>
            
            <style jsx>{`

                input[type="text"]{
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
            .select-wrapper{
               position:relative;
               height:40px;
               margin-top:30px;
               margin-bottom:39px;
            }

            .selected-wrapper{
                height:40px;
                border:1px solid var(--border-color);
                width:100%;
                border-radius:5px;
                padding: 0 15px;
                color:var(--muted);
                font-size:1rem;
                transition: border 300ms;
                display:flex;
                align-items:center;
            }

            input[type="text"]:focus{
                border-color:var(--blue);
            }
                .select-list{
                    display:flex;
                    flex-direction:column;
                    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
                    border-radius:5px;
                    position:absolute;
                    max-height:0;
                    top:60px;
                    width:100%;
                    opacity:0;
                    transition:all .4s;
                    overflow:auto;
                    scroll:smooth;
                    background:white;
                }

                .select-list::-webkit-scrollbar {
                    width: 5px;
                    background-color: #f5f5f5
                  }

                .select-list{
                    cursor:pointer;
                    z-index:100;
                }

                .select-list.selected{
                    max-height:200px;
                    opacity:1;
                }

                
                label.option{
                    padding:10px 5px;
                    font-size:1.2rem;
                    display:block;
                    cursor:pointer;
                    padding:12px 15px;
                    transition:all .4s;
                }
    
                input[type="radio"]{
                    display:none;
                }
                input[type="radio"]:checked + label{
                    background:#F9FAFE
                }
                label.option:hover{
                    background-color:#F9FAFE;
                }
    
                
    
                label.option.selected-option{
                    background:#F9FAFE;
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

                .label{
                    line-height: 18px;
                    font-size: 1rem;
                    color:var(--muted)
                }
               
            `}</style>
        </>
    )
}

export default Select


const Option = ({onClick=()=>{},name,label,value})=>{


    return(
        <>
        
        
        <style jsx>{`
                label.option{
                padding:10px 5px;
                font-size:1.2rem;
                display:block;
                cursor:pointer;
                padding:12px 10px;
                transition:all .4s;
            }

            input[type="radio"]{
                display:none;
            }
            input[type="radio"]:checked + label{
                background:blue
            }
            label.option:hover{
                background-color:#F9FAFE;
            }

            

            label.option.selected-option{
                background:#F9FAFE;
            }
        `}</style>
        </>
    )
}