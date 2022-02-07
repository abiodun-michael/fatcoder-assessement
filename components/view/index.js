


const Index = ({children,...rest})=>{

    return(
        <>
           <div className="flex-container" {...rest}>
            {children}
           </div>
           <style jsx>{`
                .flex-container{
                    display:flex;
                    gap:100px;
                    margin-top:25px;
                }
           
           `}</style>
        </>
    )
}

export default Index


export const Item = ({title, data,...rest})=>{

    return(
        <>
        <div {...rest}>
            <h4>{title}</h4>
            <p>{data}</p>
        </div>
        </>
    )
}