const Connection = require("./connection")
const {DataTypes} = require("sequelize")


const Battle = Connection.define("battle",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    unit:{
        type:DataTypes.FLOAT,
        allowNull:false,
        defaultValue:0
    },
    status:{
       type:DataTypes.BOOLEAN,
       allowNull:false,
       defaultValue:false 
    }
})

Battle.sync()


module.exports = Battle