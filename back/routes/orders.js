const express = require("express");
const router = express.Router();
const Orders = require("../ordersSchema");
const jwt = require("jsonwebtoken");

"use strict";
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
const Company = require("../CompanySchema");



/*---------------------------------------------------------------------------------------------*/


// get all orders 
router.get("/",async (req,res)=>{
      

      try {
        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, "secret");
        const id = decoded.id;
    
        if(id){

          const post = await  Orders.find({});
          return  res.json({ status: "ok", data: post });
          
            }
            
     
      } catch (error) {
        res.json({ status: "error", error: "invalid token" });
      }
    
  });
 

  
  /*---------------------------------------------------------------------------------------------*/
  //get number of order 
  router.get("/numberoforder",async (req,res)=>{
      

    try {
      const token = req.headers["x-access-token"];
      const decoded = jwt.verify(token, "secret");
      const id = decoded.id;
  
      if(id){

        const post = await  Orders.find({});
        return  res.json({ status: "ok", data: post.length });
        
          }
          
   
    } catch (error) {
      res.json({ status: "error", error: "invalid token" });
    }
  
});




/*---------------------------------------------------------------------------------------------*/
  //get number of done  and pending orders
  router.get("/numberdone",async (req,res)=>{
      

    try {
      const token = req.headers["x-access-token"];
      const decoded = jwt.verify(token, "secret");
      const id = decoded.id;
  
      if(id){

        const post = await  Orders.find({status:'done'});
        const pen = await  Orders.find({status:'pending'});
        return  res.json({ status: "ok", data: post.length ,pending:pen.length});
        
          }
          
   
    } catch (error) {
      res.json({ status: "error", error: "invalid token" });
    }
  
});



/*---------------------------------------------------------------------------------------------*/


// post new orders 
router.post("/",async (req,res)=>{
    try {
      const post = new Orders({
          ...req.body,
        });

      await post.save();
    let transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'tuwaiqauth@gmail.com',
          pass: 't123123123'
        }
      }));
      
      let mailOptions = 
      {
        from: 'tuwaiqauth@gmail.com',
        to: req.body.email,
        subject: 'TuwaiqAuth Contact Confirmation',
        html: `<h4>Dear ${post.company} Team, </h4><br/><br/>
        <p>  We appreciate your contact for order  Login&Regiset Auth <p/>. <br/>
        <p> We value your trust in our company and we will do our best to meet your service expectations<p/><br/>
        <p>  Your purchase also includes lifetime assurance for users data if a problem arise.</p>
        <p/>  Thanks again, we will contact you within 3 days ,<p/><br/>
        <b>  Sincerely,</b><br/>
        <b> TuwaiqAuth Team </b>`
         
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });  

      res.json({ status: "ok" });
    } catch (err) {
      res.json({status : err});
    }
  });
 

  /*---------------------------------------------------------------------------------------------*/

// post new company 
router.post("/company",async (req,res)=>{
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "secret");
    const id = decoded.id;
    console.log("this is my aaaaaaaaa",id)
    if(id){
    const post = new Company({
        ...req.body,
      });

      console.log("this is my xxxxxxx",post)

    await post.save();
  let transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: 'tuwaiqauth@gmail.com',
        pass: 't123123123'
      }
    }));
    
    let mailOptions = 
    {
      from: 'tuwaiqauth@gmail.com',
      to: req.body.email,
      subject: 'TuwaiqAuth SetUp instructions',
      html: `<h4>Dear ${post.company} Team, </h4><br/>
      <b>  Step1: Use this URL : www.tuwaiqauth.com/login/${post.company}<b/>.
      <i>  note: for register use :www.tuwaiqauth.com/register/${post.company} <i/><br/>
      <b>  Step2: you will have response 'OK' and name for the user </b> <br/>
      <b>  Step3: use our response to authorize users</b> <br/>
      <b>  Please if you need help don't hesitate to contact us<br/>
      <b>  Sincerely,</b><br/> 
      <b> TuwaiqAuth Team </b>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });  

    res.json({ status: "ok" });}
  } catch (err) {
    res.json({status : err});
  }
});
/*---------------------------------------------------------------------------------------------*/

//get all company 
router.get("/getallcompany",async (req,res)=>{
      

  try {
      const post = await  Company.find({},{email:0});
      return  res.json({ status: "ok", data: post });
 
 
  } catch (error) {
    res.json({ status: "error", error: "invalid token" });
  }

});


/*---------------------------------------------------------------------------------------------*/

  router.put("/mark/:id",async (req,res)=>{
      

    try {
      const token = req.headers["x-access-token"];
      const decoded = jwt.verify(token, "secret");
      const id = decoded.id;
  
      if(id){
    
       const post =  await  Orders.findByIdAndUpdate(req.params.id,{...req.body});
       console.log(req.body.status)

       console.log("this is ppost", post)
        return  res.json({ status: "ok"});
        
          }
          
   
    } catch (error) {
      res.json({ status: "error", error: "invalid token" });
    }
  
});



/*---------------------------------------------------------------------------------------------*/

  module.exports = router;