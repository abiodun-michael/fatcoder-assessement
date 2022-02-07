require("dotenv").config()
const express = require("express")
const cors = require("cors")
const {Army,Battle} = require("./model")
const {Server} = require("socket.io")

const app = express()

const PORT = process.env.PORT || 5000


app.use(express.json());
app.use(express.urlencoded());
app.use(cors())



const appServer = app.listen(PORT,()=>{
    console.log("Service is running")
})

const io = new Server(appServer,{
    cors:{
      origin: ["https://localhost:3000"]
    }
  })

app.post("/add-battle", async(req,res)=>{
    const { name } = req.body || {}
    if(name){
        const [battle,created] = await Battle.findOrCreate({where:{name},defaults:{name}})
        if(created){
            io.sockets.emit("battle_created",battle)
            res.status(200).json({message:"Battle created!", status:true,data:battle})
        }else{
            res.status(200).json({message:"Battle with name already exist", status:false})
        }
    }else{
        res.status(400).json({message:"Battle name is not provided", status:false})
    }
})


app.get("/battles",async(req,res)=>{
    const games = await Battle.findAll()
    res.status(200).json({status:true,message:"Games retrived", data:games})
})


app.post("/add-army",async(req,res)=>{
    const {name,unit,strategy,battleId} = req.body || {}
    if(name ==="" || unit ==="" || strategy ==="" || battleId <= 0){
        res.status(200).json({message:"You must provide every field", status:false})
    }else{

        if(!["random","weakest","strongest"].includes(strategy.toLowerCase())){
            res.status(400).json({message:"Invalid strategy", status:false})
        }else{

            if(unit < 80){
                res.status(200).json({message:"Unit cannot be less than 80",status:false})
            }else if(unit > 100){
                res.status(200).json({message:"Unit cannot be more than 100",status:false})
            }else{
            const isBattleValid = await Battle.findOne({where:{id:battleId}})
            if(!isBattleValid){
                res.status(200).json({message:"Battle is invalid", status:false})
            }else{
            const armyCount = await Army.count({where:{battleId}})
        
            if(armyCount >= 3){
                res.status(200).json({message:"Army already up to 3 for battle", status:false})
            }else{
                const isBattleNotStarted = await Battle.findOne({where:{id:battleId,status:false}})
                if(isBattleNotStarted){
                    const [army,created] = await Army.findOrCreate({where:{name,strategy},defaults:{name,unit,strategy,battleId}})
                    if(created){
                        io.sockets.emit("army_created",army)
                        res.status(200).json({message:"Army added successfully", status:true,data:army})
                    }else{
                        res.status(200).json({message:"Army with strategy already exists", status:false})
                    }
                }else{
                    res.status(200).json({message:"Battle already started", status:false})
                }
            }
        }
    }
    }

        
    
    }   
})

app.get("/armies/:id",async(req,res)=>{
    const {id} = req.params || {}
    if(id){
        const army = await Army.findAll({where:{battleId:id}})
        res.status(200).json({message:"Armies retrieved", status:true, data:army})
    }else{
        res.status(200).json({message:"You must provide battle id", status:false})
    }
})


app.put("/start-battle/:id",async(req,res)=>{
    const id = req.params?.id
    if(id){
        const countArmy = await Army.count({where:{battleId:id}})
        if(countArmy ===3){
            const [battle] = await Battle.update({status:true},{where:{id}})
            if(battle){
                io.sockets.emit("battleStarted",id)
                res.status(200).json({message:"Battle started", status:true}) 
            }else{

                res.status(200).json({message:"Sorry, an error occured", status:false})
            }
        }else{
            res.status(200).json({message:"Sorry, you cannot start a game until 3 armies have joined", status:false})
        }
        
    }
})


app.get("/battle/:id",async(req,res)=>{
    const id = req.params?.id
    if(id){
        const battle = await Battle.findOne({where:{id}})
        res.status(200).json({message:"Game retrieved", status:true,data:battle})
    }else{
        res.status(400).json({message:"Battle id is required", status:false})
    }
})


app.put("/reset-battle/:id",async(req,res)=>{
    const id = req.params?.id
    if(id){
        const isReset = await Battle.update({where:{id,status:true}})
        if(isReset){
            res.status(200).json({message:"Battle has been reset", status:true})
        }else{
            res.status(200).json({message:"Either battle doesn't exist or its not started", status:false})
        }
    }
})




    
  
    
    io.on("connection", async(socket) => {
       
         
            io.emit("welcome",`${fullName} joined`)
    
            socket.on("send_comment",(msg)=>{
                io.emit("receive_message",{comment:msg,user:fullName})
            })
        
       
    
    });