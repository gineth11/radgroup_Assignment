const router = require("express").Router();
// const Post  = require("../models/User");
const PetModel = require("../models/Pet");
const PostModel = require("../models/Post");


// Routes
router.post('/save', (req, res) => {
    const data = req.body;
    const id= "pt"+ new Date().getTime();
    const newPost= new PostModel({
        _id:id,
        name: data.name,
        description: data.description,
        price: data.price,
        user:data.user
    });
    const newPet = new PetModel({
        _id:id,
        name: data.name,
        description: data.description,
        type: data.type,
        age: data.age,
        price: data.price,
        gender:data.type,
        owner:data.user,
        tp:data.tp
    });
    newPost.save();
    newPet.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});

router.get('/', (req, res) => {
    const id= req.query.id;
    if(id){
        PetModel.findOne({_id:id}, (err, docs) => {
            if (err) {
                console.log(err);
            } else {
                console.log(docs);
                res.send(docs);
            }
        })
    }else{
        PetModel.find({}, (err, data) => {
            res.json(data);
        });
    }
});

module.exports = router;