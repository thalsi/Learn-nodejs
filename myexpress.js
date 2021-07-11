const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const fs = require('fs');

const user=require('./user/user.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    res.setHeader('Content-Type', 'application/json');
    next();
})

console.log(user);
app.get('/get',(req,res)=>{
    // res.setHeader('Content-Type', 'application/json');
    res.status(200)
    res.end(JSON.stringify(user));
})

app.post('/post',(req,res)=>{
   console.log(req.body);
   res.send('post seccefully');
})
app.listen(3000,()=> console.log('Server running on 3000'));