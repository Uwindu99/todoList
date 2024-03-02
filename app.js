//jshint esversion:6

const express =require("express");
const bodyParser =require("body-parser");
///const date = require(__dirname+"/date.js");
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


mongoose.connect("mongodb://localhost:27017/todolistDB",);

const itemSchema={
    name:String
};

const Item=mongoose.model("Item",itemSchema);

const item1 = new Item({
    name:"Welcome to your todolist"
});
const item2 = new Item({
    name:"Press + button to add a new item"
});
const item3 = new Item({
    name:"<--press this to delete an item"
});

const defaultItem=[item1,item2,item3];

Item.insertMany(defaultItem)
.then(function () {
    console.log("Successfully saved defult items to DB");
  })
  .catch(function (err) {
    console.log(err);
  });



app.get("/",function(req,res){
    
   


    res.render("lists",{ listTitle :"Today",newList :items });
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