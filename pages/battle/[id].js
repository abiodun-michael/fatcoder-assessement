import Layout from "../../components/layout"
import Table from '../../components/table'
import Card from '../../components/card'
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import Spinner from '../../components/spinner'
import { Eye } from "react-feather"
import {Button, Form, Input, Select} from '../../components/form'
import Drawer from '../../components/drawer'
import { toast } from "react-toastify"

const Index = ({id})=>{

    const [data,setData] = useState([])
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState({
        list:false,
        add:false
    })

    const formRef = useRef()

    const columns = [
        {title:"ID",dataIndex:"id",width:"10%"},
        {title:"Name",dataIndex:"name"},
        {title:"Unit",dataIndex:"unit"},
        {title:"Strategy",dataIndex:"strategy"},
        {title:"Created At",dataIndex:"createdAt"}
    ]

    const getData = async()=>{
        setLoading({...loading,list:true})
        const {data} = await axios.get(`http://localhost:5000/armies/${id}`)
       if(data?.status){
           setData(data?.data)
          
       }
       setLoading({...loading,list:false})
    }
    
    const addBattle = async(e)=>{
        setLoading({...loading,add:true})
        const {data} = await axios.post("http://localhost:5000/add-army",{
            ...e,
            battleId:id
        })

        if(data?.status){
            toast.success(data?.message)
            formRef.current.reset()
            setOpen(false)
        }else{
            toast.error(data?.message)
        }
        setLoading({...loading,add:false})
    }

    const startBattle = async()=>{
        setLoading({...loading,list:true})
        const {data} = await axios.put(`http://localhost:5000/start-battle/${id}`)
       if(data?.status){
           toast.success(data?.message)
       }else{
        toast.error(data?.message)
       }
       setLoading({...loading,list:false})
    }

    useEffect(()=>{

        getData()

    },[])

    return(
        <>
            <Layout>
                <div className="cta-container">
                <h1>Army List</h1>
                <Button type="primary" onClick={()=>setOpen(true)}>Add Army</Button>
                </div>
                
                <Card>
                    <Button onClick={startBattle} type="ghost">Start Battle</Button>
                    {
                        loading?.list ? <Spinner />:
                    <Table columns={columns} dataSource={data}/>
                    }
                </Card>
            </Layout>

            <Drawer label="Create Army" width={500} visible={open} onCancle={()=>setOpen(false)}>
                    <Form ref={formRef} onFinish={addBattle}>
                        <Input name="name" label="Name" 
                        rules={{required:"Name is required"}}
                        placeholder="Enter battle name"/>
                        <Input name="unit" type="number" label="Unit" 
                            rules={{required:"Unit is required"}}
                            placeholder="Enter battle unit"/>
                        <Select name="strategy" label="Strategy" 
                            list={[{label:"Random",value:"random"},
                            {label:"Weakest",value:"Weakest"},{label:"Strongest",value:"Strongest"}]}
                            rules={{required:"Strategy is required"}}
                            placeholder="Enter battle unit"/>
                        <Button loading={loading?.add} 
                            style={{marginTop:20}} 
                            htmlType="submit" 
                            type="primary">Save</Button>
                    </Form>
            </Drawer>
           

            <style jsx>{`
                .cta-container{
                    display:flex;
                    justify-content:space-between;
                    margin:20px 0;
                }

            `}</style>
        </>
    )
}



export async function getServerSideProps({query}) {


    const {id} = query || {}
        if(!id){
            return {
                redirect: {
                    permanent: false,
                    destination: "/",
                },
                props:{},
                };
        }

    return {
         props:{id}
    };
    
  }
export default Index