const express = require('express')
const router = express.Router()



router.get("/battles",(req,res)=>{
    res.send("Hello battles")
})

module.exports = router