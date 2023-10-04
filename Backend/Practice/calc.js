const express=require('express');
const app=express();
app.use(express.urlencoded({extended:true})); //this is the middleware to read data

app.use(express.static(`${__dirname}`))
app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/calc.html`);
});

app.post("/",(req,res)=>{
    let num1 = Number(req.body.num1);  
    let num2 = Number(req.body.num2);
    const add=num1+num2;  
    res.status(200).send("sum is "+add);
});

app.listen(5000,()=>{
    console.log("server at 5000");
});