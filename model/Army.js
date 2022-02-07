const Connection = require("./connection")
const {DataTypes} = require("sequelize")
const Battle = require("./Battle")

const Army = Connection.define("army",{
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    unit:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    strategy:{
        type:DataTypes.STRING,
        allowNull:false
    },
})

Battle.hasMany(Army)
Army.sync()


module.exports = Army