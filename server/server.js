const app= require('./App');


const post=require('./routes/post.js')
const pet=require('./routes/pet.js')
const auth=require('./routes/user.js')


app.use("", post);
app.use("/pet", pet);
app.use("/user", auth);


//adding callback function
app.listen(3001, () => {
  console.log("SERVER start");
});
