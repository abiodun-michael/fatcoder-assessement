import Header from "./Header";


const Layout = ({children})=>{


    return(
        <>
            <Header />
            <div className="container">
                {children}
            </div>

            <style jsx>{`
            
                .container{
                    width:80%;
                    margin:0 auto;
                    padding-top:50px;
                }
            `}</style>
        </>
    )
}

export default Layout