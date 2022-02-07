import Layout from "../components/layout"
import Table from '../components/table'
import Card from '../components/card'
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import Spinner from '../components/spinner'
import { Eye } from "react-feather"
import {Button, Form, Input} from '../components/form'
import Drawer from '../components/drawer'
import { toast } from "react-toastify"
import Link from "next/link"

const Index = ()=>{

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
        {title:"Created At",dataIndex:"createdAt"}
    ]

    const getData = async()=>{
        setLoading({...loading,list:true})
        const {data} = await axios.get("http://localhost:5000/battles")
       if(data){
           setData(data?.data)
           setLoading({...loading,list:false})
       }
    }
    
    const addBattle = async(e)=>{
        setLoading({...loading,add:true})
        const {data} = await axios.post("http://localhost:5000/add-battle",{
            ...e
        })

        if(data?.status){
            toast.success(data?.message)
            formRef.current.reset()
            setOpen(false)
        }else{
            toast.success(data?.message)
        }
        setLoading({...loading,add:false})
    }

    useEffect(()=>{

        getData()

    },[])

    return(
        <>
            <Layout>
                <div className="cta-container">
                <h1>Battle List</h1>
                <Button type="primary" onClick={()=>setOpen(true)}>Add Battle</Button>
                </div>
                
                <Card>
                    {
                        loading?.list ? <Spinner />:
                    <Table columns={columns} dataSource={data}/>
                    }
                </Card>
            </Layout>

            <Drawer label="Create Battle" width={400} visible={open} onCancle={()=>setOpen(false)}>
                    <Form ref={formRef} onFinish={addBattle}>
                        <Input name="name" label="Name" 
                        rules={{required:"Name is required"}}
                        placeholder="Enter battle name"/>
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

export default Index