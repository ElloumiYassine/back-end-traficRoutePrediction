const express = require('express');
const Administrator=require('../Models/Administrator')
const User = require('../Models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();


//**************create new Admin**************

router.post('/createAdminCrypted', async (req, res) => {
    try {
        const data = req.body;
        console.log(data)
        const admin = new Administrator(data);
        const salt = await bcrypt.genSalt(10);
        const cryptedPass = await bcrypt.hash(data.passwordAdmin, salt);
        admin.passwordAdmin = cryptedPass;
        console.log(admin);
        const savedAdmin = await admin.save();
        res.status(200).send(savedAdmin);
    } catch (error) {
        res.status(400).send(error);
    }
});

//**************Login Admin**************

router.post('/login',async(req,res)=>{
    data=req.body;
    console.log(data);
    admin=await Administrator.findOne({emailAdmin:data.emailAdmin});
    console.log(admin);
    if(!admin){
        res.status(404).send("invalid email or password")
    }else{
        validPass= bcrypt.compareSync(data.passwordAdmin,admin.passwordAdmin)
        if(!validPass){
            res.status(401).send("invalid email or password")
        }else{
            payload={
                _id:admin._id,
                email:admin.emailAdmin,
                fName:admin.fNameAdmin,
            }
            token=jwt.sign(payload,'1234567')

            res.status(200).send({mytoken:token})
        }
    }
})
/*********************Display All users************************* */
router.get('/getAllUsers', (req, res) => {
    User.find()
        .then(
            (users) => {
                res.send(users)
            }
        )
        .catch(
            (err) => {
                res.send(err)
            }
        )
})
/*********************Create Crypted USer************************** */
router.post('/createUserCrypted', async (req, res) => {
    try {
        const data = req.body;
        //console.log(data);
        const usr = new User(data);
        const salt = await bcrypt.genSalt(10);
        const cryptedPass = await bcrypt.hash(data.passwordUsr, salt);
        usr.passwordUsr = cryptedPass;
        console.log(usr);
        const savedUser = await usr.save();
        res.status(200).send(savedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});
/*********************update user from id ************************* */

router.put('/update/:id', async (req, res) => {

    try {
        id = req.params.id
        updatedUser = req.body
        usr = await User.findByIdAndUpdate({ _id: id}, updatedUser )
        res.send(usr)
        console.log('user updated succefully');

    } catch (error) {
        res.send(error)
    }
})
/*********************update user from id ************************* */
router.delete('/deleteById/:id', async (req, res) => {
    id = req.params.id
    try {
        usr = await User.findByIdAndDelete({ _id: id })
        res.send(usr)
    } catch (error) {
        res.send(error)
    }
})




module.exports = router;
