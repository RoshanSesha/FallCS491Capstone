const express=require("express");

const app=express();
const mysql=require("mysql");
//connection to heroku database
const connection = mysql.createPool({
    host:"us-cdbr-east-04.cleardb.com", 
    user:"b67965676b9bc1",
    password:"fef70fef",
    database:"heroku_f7b0b0e3718ae7b",
});
//handle Cross domain requests - communicate with mysql server from express code
var cors = require('cors')
app.use(cors()) 
// connecting to db
connection.getConnection((err,data)=>{
    if (err){
    console.log(err);
    }
    if(data){
        console.log("sucessfully corrected to the database");
    }
});
app.listen(process.env.PORT || 3001,() =>{
//app.listen(80,()=>{
    console.log("server is started");
});

// displaying inspirationposts
//get method to pull all posts from db
app.get("/inspirationposts",(req,res)=>{
    connection.query("select * from inspirationposts",(err,rows,feilds)=>{
        if(err){
           res.send("there are some error"); 
        return;
          }
          res.status(200).json(rows);
    })
    
});

//insert into inspirationposts
app.get("/insertinspirationposts",(req,res)=>{
    // textbox value is accessed as request.querystring.post and inserted into database through post
    let post = {post: req.query.post, usertype: "anonymous", date: (new Date()).toISOString()}
    let sql = 'Insert into inspirationposts Set ?'
    //post method called to push data into db
    let query = connection.query(sql,post,err => {
        if(err){
           res.send("there are some error"); 
        
          }
          res.send("inspiration post added"); 
         
    })
   
});
// displaying mainposts
//get method to pull all posts from db
app.get("/mainposts",(req,res)=>{
    connection.query("select * from mainposts",(err,rows,feilds)=>{
        if(err){
           res.send("there are some error");
        return;
          }
          res.status(200).json(rows);
    })
   
 });
  
 //insert into mainposts 
 app.get("/insertmainposts",(req,res)=>{
   // textbox value is accessed as request.querystring.post and inserted into database through post
    let post = {post: req.query.post, usertype: "anonymous", date: (new Date()).toISOString()}
    let sql = 'Insert into mainposts Set ?'
    //post method to push data into db
    let query = connection.query(sql,post,err => {
        if(err){
           res.send("there are some error");
       
          }
          res.send("mainposts post added");
        
    })
  
 });
/*
//insert into inspirationposts
app.post("/insertinspirationposts",(req,res)=>{

    console.log(req.body.inspirationpost);
    // postid should not be passed; DB can auto generate; same for date
    let post = {postid: 25, post: req.body.inspirationpost, usertype: "anonymous", date: (new Date()).toISOString()}
    let sql = 'Insert into inspirationposts Set ?'
    let query = connection.query(sql,post,err => {
        if(err){
           res.send("there are some error"); 
        
          }
          res.send("inspiration post added"); 
         
    })
   
});
*/
app.get("/events",(req,res)=>{
    connection.query("select * from events",(err,rows,feilds)=>{
        if(err){
           res.send("there are some error"); 
        return;
          }
          res.status(200).json(rows.map((row)=>{
              return{
                  date:row.event_date, 
                  location:row.event_location,
                  seats:row.event_seats,
                  speakers:row.event_speakers,
                  about:row.event_about,
              }
          }));
    })

})