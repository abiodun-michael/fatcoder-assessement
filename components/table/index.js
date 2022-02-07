import {useRef, useEffect} from 'react'


const Table = ({columns = [],dataSource=[]})=>{
    const ref = useRef()

   
    return(
        <>
        <table ref={ref}>
            <THead columns={columns}/>
            <TBody headers={columns} data={dataSource}/>
        </table>
            
            <style jsx>{`

            table{
                width:100%;
                border-collapse: collapse;
                overflow-x:auto;
            }
            
            `}</style>
        </>
    )
}

export default Table


const THead = ({columns =[]})=>{

  

    return(
        <>
        
            <thead>
                <tr>
                    {
                        columns?.map(({title, width},i)=>(
                            <th key={i} style={{width:width}}>{title}</th>
                        ))
                    }
                </tr>
            </thead>
        
        <style jsx>{`

            thead tr th{
                font-size:14px;
                color:var(--heading);
                font-weight:500;
                text-align:left;
                padding:20px 10px;
                border-bottom:1px solid var(--border-color)
            }
        
        `}</style>
        </>
    )
}


const TBody = ({headers,data})=>{

  

    return(
        <>
            <tbody>
             {
                 data?.map((item,i)=>(
                    <tr key={i}>
                   {
                       headers?.map(({dataIndex,render},inex)=>(
                        <td key={inex}>{ render ? headers[inex]?.render(item,i): item[dataIndex]}</td>
                    ))
                   }
                </tr>
                 ))
             }
               
                
            </tbody>

            <style jsx>{`

            tbody tr:nth-child(even){
                background-color:#F9FAFE;
                border-radius:5px;
            }

            tbody tr td:first-child{
                border-top-left-radius:5px;
                border-bottom-left-radius:5px;
            }
                tbody tr td{
                    padding:10px;
                    font-size:14px;
                    color:var(--muted);
                }
            
            `}</style>
        </>
    )
}