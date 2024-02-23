//jshint esversion:6

const express =require("express");
const bodyParser =require("body-parser");

const app = express();

let items=["Buy food","Cook food","Eat food"];
let workItems=[];

    
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/",function(req,res){
    
    let today = new Date();
   
    let options ={
        weekday:"long",
        day: "numeric",
        month:"long"

    };

    let day= today.toLocaleDateString("en-US",options)

  

    res.render("lists",{ listTitle :day,newList :items });
});

app.post("/",function(req,res){
    let item = req.body.newItem;

   

    if(req.body.list==="WorkList"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }   
    
})

app.get("/work",function(req,res){
    res.render("lists",{listTitle : "WorkList", newList:workItems});
});




app.listen(3000,function(){
    console.log("server running with port 3000");
})