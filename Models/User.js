const mongoose=require('mongoose')

const User=mongoose.model('user',{
    fNameUsr:{type:String},
    lNameUsr:{type:String},
    emailUsr:{type:String},
    passwordUsr:{type:String},
    img:{type:String},
    pathHistory:{type:String},
})

module.exports=User;