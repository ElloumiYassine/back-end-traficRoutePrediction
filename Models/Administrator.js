const mongoose=require('mongoose')

const Administrator=mongoose.model('administrator',{
    fNameAdmin:{type:String},
    lNameAdmin:{type:String},
    emailAdmin:{type:String},
    passwordAdmin:{type:String},
})

module.exports=Administrator;