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

const defaultItems=[item1,item2,item3];

const listSchema={
    name:String,
    items:[itemSchema]
};
const List = mongoose.model("List",listSchema);

app.get("/",function(req,res){

    Item.find({}).then(function(items,err){

    if(items.length===0){
        Item.insertMany(defaultItems)
        .then(function () {
        console.log("Successfully saved defult items to DB");
        })
        .catch(function (err) {
        console.log(err);
        });
        res.redirect("/");
    }else{
        res.render("lists",{ listTitle :"Today",newList :items});  
    }
    });
})

app.get("/:customListName",function(req,res){
    const customListName = req.params.customListName;

    List.findOne({name:customListName}).then(function(foundList,err){
    if(!err){
        if(!foundList){
            const list = new List({
                name:customListName,
                items:defaultItems
            });
        
            list.save();
            res.redirect("/"+ customListName);
        }else{
            res.render("lists",{ listTitle :foundList.name,newList :foundList.items});  
        }
    }

    });

  
});
   


app.post("/",function(req,res){
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name:itemName
    });

    if (listName==="Today"){
        item.save();
        res.redirect("/");
    }else{
        List.findOne({name:listName}).then(function(foundList,err){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/"+ listName);
        });
    }
   
});

app.post("/delete",function(req,res){
    const checkedId= req.body.checkbox;

    Item.findByIdAndDelete(checkedId).then(function () {
        console.log("Successfully delete");
      })
      .catch(function (err) {
        console.log(err);
      });
      res.redirect("/");
})


app.listen(3000,function(){
    console.log("server running with port 3000");
})