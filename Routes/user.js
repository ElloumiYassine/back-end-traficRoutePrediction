const express = require('express');
const User = require('../Models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const multer = require('multer');

//**************create new user**************
//upload files(imgs)
let filename = '';
const myStorage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, redirect) => {
        const date = Date.now();
        // mimetype: imge/png
        const f1 = date + '.' + file.mimetype.split('/')[1];
        console.log(f1);
        redirect(null, f1);
        filename = f1;
    }
})
const upload = multer({ storage: myStorage })

router.post('/createUserCrypted', upload.any('image'), async (req, res) => {
    try {
        const data = req.body;
        const usr = new User(data);
        usr.img = filename;
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


//**************Login user**************

router.post('/login',async(req,res)=>{
    data=req.body;
    user=await User.findOne({emailUsr:data.emailUsr});
    if(!user){
        res.status(404).send("invalid email or password")
    }else{
        validPass= bcrypt.compareSync(data.passwordUsr,user.passwordUsr)
        if(!validPass){
            res.status(401).send("invalid email or password")
        }else{
            payload={
                _id:user._id,
                email:user.email,
                fName:user.fName,
            }
            token=jwt.sign(payload,'1234567')

            res.status(200).send({mytoken:token})
        }
    }
})



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
/*********************delete user from id ************************* */
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
