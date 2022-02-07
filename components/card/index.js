import {forwardRef} from 'react'


const Card = forwardRef(({children,...rest},ref)=>{


    return(
        <>
        <div className="card" ref={ref} {...rest}>
        {children}
        </div>

        <style jsx>{`
        
            .card{
                border-radius:5px;
                background-color:#ffffff;
                padding:50px;
            }
        `}</style>
        </>
    )
})

export default Card