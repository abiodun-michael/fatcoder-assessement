import '../public/css/global.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NextNprogress from 'nextjs-progressbar'
import 'nprogress/nprogress.css'

const MyApp = ({Component, pageProps})=>{


    return(
       <>
            <ToastContainer 
                theme='light' 
                position='top-center'
                hideProgressBar/>
                <NextNprogress
                   startPosition={0.3}
                   stopDelayMs={200}
                   height={2}
                   showOnShallow={true}
                   options={{
                       showSpinner: true
                   }}
               />
            
                <Component {...pageProps}/>
           
        </>
    )
}

export default MyApp