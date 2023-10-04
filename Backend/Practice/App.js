const express=require('express');

const app=express();

app.get("/",(req,res)=>{
    res.send("hello from the server.");
})
app.get("/about",(req,res)=>{
    res.send("About page")
})

app.listen(5000,()=>{
    console.log("server running at 5000");
})