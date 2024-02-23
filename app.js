//jshint esversion:6

const express =require("express");
const bodyParser =require("body-parser");

const app = express();

var items=["Buy food","Cook food","Eat food"];
    
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
    
    var today = new Date();
   
    var options ={
        weekday:"long",
        day: "numeric",
        month:"long"

    };

    var day= today.toLocaleDateString("en-US",options)

  

    res.render("lists",{ kindOfDay :day,newList :items });
});

app.post("/",function(req,res){
    var item = req.body.newItem;

    items.push(item);

    res.redirect("/");

    
    
})


app.listen(3000,function(){
    console.log("server running with port 3000");
})