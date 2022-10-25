const router = require("express").Router();
// const Post  = require("../models/User");
const UserModel = require("../models/User");
const passport= require("../Authenticate/PassportConfig");
const bcrypt = require("bcrypt");

router.post("/register", (req, res) => {

    UserModel.find({email: req.body.email}, (err, docs) => {
        if(docs.length > 0){
            res.status(400).json({msg: "User already exists"})
        }else{
            const HashedPassword = bcrypt.hashSync(req.body.password, 10);
            const newUser = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: HashedPassword,
                tp: req.body.tp,
                role: req.body.role
            });
            newUser.save((err, user) => {
                if(err)
                {
                    res.status(400).json({msg: "Error occurred"})
                }else{
                    res.status(200).json({status:"Registered"})
                }
            })
        }
    })


})


router.post("/update-user", (req, res) => {
    const HashedPassword = bcrypt.hashSync(req.body.password, 10);
    UserModel.findByIdAndUpdate(req.body.id, {
        username: req.body.username,
        email: req.body.email,
        password: HashedPassword,
        tp: req.body.tp,
    }, (err, docs) => {
        if(err){
            res.status(400).json({msg: "Error occurred"})
        }else{
            res.status(200).json({status:"Updated"})
        }
    })
})

router.get("/login-failed", (req, res) => {
    res.status(400).send("Login-Failed")
})

router.post("/delete-user", (req, res) => {
    UserModel.findByIdAndDelete(req.body.id, (err, docs) => {
        if(err){
            res.status(400).json({msg: "Error occurred"})
        }else{
            res.status(200).json({status:"Deleted"})
        }
    })
})

router.post("/update-user", (req, res) => {
    UserModel.findByIdAndUpdate(req.body.id, req.body, (err, docs) => {
        if(err){
            res.status(400).json({msg: "Error occurred"})
        }else{
            res.status(200).json({status:"Updated"})
        }
    })
})

router.post("/getSingleUser", (req, res) => {
    UserModel.findById(req.body.id, (err, docs) => {
        if(docs){
            res.status(200).json(docs)
        }else{
            res.status(400).json({msg: "User not found"})
        }
    })
})

router.get("/getSellers",(req, res) => {
    UserModel.find({role: "seller"}, (err, docs) => {
        if(err){
            res.status(400).json({msg: "Error occurred"})
        }else{
            res.status(200).json({status:"success", data: docs})
        }
    })
})
// router.post("/login",(req,res)=>{
//     console.log(req.body)
//     res.json(req.body)
// })

router.post("/login", passport.authenticate("local",{
    failureRedirect: "/user/login-failed",
}), (req, res) => {
    res.status(200).json({status:"Logged in",user:req.user})
})

router.get("/logout", (req, res) => {
    req.logout((err)=>{
       if (err){
           console.log(err)
       }else {
           res.status(200).json({status:"Logged out"})
       }

    })
})

router.post("/update-user", (req, res) => {

});

module.exports = router;