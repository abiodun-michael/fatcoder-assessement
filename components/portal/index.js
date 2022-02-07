import { createPortal } from "react-dom"
import { useEffect, useState } from "react"


const Portal = ({children})=>{
    const [attached, setAttached] = useState(false)

    useEffect(()=>{
        setAttached(true)

        return ()=>setAttached(false)
    },[])

    return attached ? createPortal(children, document.getElementById("portal-node")):null
}

export default Portal