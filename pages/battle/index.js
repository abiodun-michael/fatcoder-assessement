

const Index = ()=>{

    return(
        <></>
    )
}

export async function getServerSideProps() {


    return {
        redirect: {
            permanent: false,
            destination: "/",
        },
        props:{},
        };
  }

  export default Index