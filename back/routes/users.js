const express = require("express");
const router = express.Router();
const UserInfo = require("../userSchema");
const jwt = require("jsonwebtoken");


/*---------------------------------------------------------------------------------------------*/

//regiister
router.post("/", async (req, res) => {
  const post = new UserInfo({
    ...req.body,
    date:new Date().toLocaleString([], { hour12: true})
  });

  try {
    const token = jwt.sign(
      {
        name: req.body.name,
        role:post.role,
        id: post._id,
      },
      "secret"
    );
    await post.save();
    res.json({ status: "ok", data: token });
  } catch (err) {
    res.json({status : err});
  }
});

/*---------------------------------------------------------------------------------------------*/

//update 1 user 
router.put("/changeone", async (req, res) => {


  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "secret");
    const id = decoded.id;
  
    if(id){
      const updateUser = await  UserInfo.findOneAndUpdate(id,{
        ...req.body,
      });
      console.log(updateUser)
      await updateUser.save();
        }

    return res.status(204).send("new user added ");
  } catch (error) {
    res.json({ status: "error", error: "invalid token" });
  }


})
/*---------------------------------------------------------------------------------------------*/

//get one user 
router.get("/getone", async (req, res) => {


  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "secret");
  
    const id = decoded.id;

    if(id){

      const updateUser = await  UserInfo.findById(id,{password:0})
      return res.json(updateUser);
      
        }
        
 
  } catch (error) {
    res.json({ status: "error", error: "invalid token" });
  }


})

/*---------------------------------------------------------------------------------------------*/


router.get("/getall",async (req,res)=>{

  try{
    const user = await UserInfo.find({},{password:0})
    res.json({ status: "ok", data: user });
  }
  catch(err){
    res.json({ status: "error" });
  }


})

/*---------------------------------------------------------------------------------------------*/
//get number of users for dashboard 
router.get("/numberofusers",async (req,res)=>{

  try{
    const user = await UserInfo.find({},{password:0})

    res.json({ status: "ok", data: user.length });
  }
  catch(err){
    res.json({ status: "error" });
  }


})

/*---------------------------------------------------------------------------------------------*/


// Login
router.post("/login", async (req, res) => {
  try {
    const user = await UserInfo.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      const updateDate  = await UserInfo.findByIdAndUpdate(user.id,
      {  date: new Date().toLocaleString([], { hour12: true})}
        
        )
      const token = jwt.sign(
        {
          name: user.name,
          role:user.role,
          id: user._id,
        },

        "secret"
      );

      res.json({ status: "ok", data: token });
    } else {
      res.json("no user");
    }
  } catch (err) {
    res.json(err);
  }
});

/*---------------------------------------------------------------------------------------------*/

//new user from admin
router.post("/newuser", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret");
    const id = decoded.id;
    
    if(id){
      const post = new UserInfo({
        ...req.body,
        date:new Date().toLocaleString([], { hour12: true})
      });
      await post.save();
     


        }
   
    return res.status(204).send("new user added ");
  } catch (error) {
    res.json({ status: "error", error: "invalid token" });
  }
  res.status(204).send("sucess");
});

/*---------------------------------------------------------------------------------------------*/

router.put("/updateinfo/:id", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret");
    const id = decoded.id;
    if(id){
    const user = await UserInfo.findByIdAndUpdate(req.params.id,{ ...req.body });}
    return res.status(204).send("update sucess");
  } catch (error) {
    res.json({ status: "error", error: "invalid token" });
  }
  res.status(204).send();
});

/*---------------------------------------------------------------------------------------------*/

router.delete("/:id", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret");
    const id = decoded.id;
    if(id){
      const user = await UserInfo.findByIdAndDelete(req.params.id);
    }
   
    return res.status(204).send("update sucess");
  } catch (error) {
    res.json({ status: "error", error: "invalid token" });
  }
  res.status(204).send();
});
/*---------------------------------------------------------------------------------------------*/

module.exports = router;
