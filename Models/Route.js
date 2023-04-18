const mongoose=require('mongoose')

const Route=mongoose.model('route',{
    startPoint:{type:Number},
    endPoint:{type:Number},
    sysTime:{type:Date},
})

module.exports=Route;