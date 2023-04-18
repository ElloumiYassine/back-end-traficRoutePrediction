const express = require('express');


const app = express();
//allow node to read JSON format 
app.use(express.json())
//initialisation of DB
require('./configDB/connect.js')


//http://127.0.0.1:3000/product/....
const userRoute = require('./Routes/user')
app.use('/user',userRoute)

const routeRoute=require('./Routes/route')
app.use('/route',routeRoute)

const adminRoute=require('./Routes/admin')
app.use('/admin',adminRoute)

app.listen(3000,()=>{
    console.log('hello from server.js');
})