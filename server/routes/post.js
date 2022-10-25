const router = require("express").Router();
// const Post  = require("../models/User");
const PostModel = require("../models/Post");

// Routes
router.get('/', (req, res) => {
    const id= req.query.id;
    if(id){
        PostModel.findOne({_id:id}, (err, docs) => {
            if (err) {
                console.log(err);
            } else {
                res.send(docs);
            }
        })
    }else{
        PostModel.find({}, (err, data) => {
            res.json(data);
        });
    }
});

router.post('/getSinglePost', (req, res) => {
    const id= req.body.id;
    PostModel.findById(id, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.send(docs);
        }
    })
});

router.post("/update-post", (req, res) => {
    const id= req.body.id;
    const name= req.body.name;
    const description= req.body.description;
    PostModel.findByIdAndUpdate(id, {
        name: name,
        description: description,
    }, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.send(docs);
        }
    })
})

router.post("/getPostsBySellerId", (req, res) => {
    const sellerId = req.body.id;
    PostModel.find({ user:sellerId }, (err, data) => {
        res.json(data);
    });
})

router.post('/getPost', (req, res) => {
    const id= req.body.id;
    PostModel.find({_id:id}, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.send(docs);
        }
    })
});

router.post('/save', (req, res) => {
  const data = req.body;

  const newPost = new PostModel(data);

  newPost.save((error) => {
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

router.get("/getPost", (req, res) => {
  PostModel.find({}, (err, result) => {
    if (err) {
    } else {
      res.json(result);
      console.log(result);
    }
  });
});

router.post("/createPost", async (req, res) => {
  const user = req.body;
  const Post = new PostModel(user);
  await Post.save({});

  res.json(user);
});


router.get('/name', (req, res) => {
  const data =  {
      name: 'zhan',
      description:" new born puppy",
      price:10000
  };
  res.json(data);
});




module.exports = router;