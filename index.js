import express from "express";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var title=[];
var text=[];
var i =0;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
  res.render(__dirname+"/index.ejs",{title:title,text:text});
});
app.post("/add",(req,res)=>{
title[i]=req.body.Titlepost;
text[i]=req.body.newpost;

res.render(__dirname+"/index.ejs",{title:title,text:text});
i+=1;

});
app.get('/blog/:title', (req, res) => {
  const index = title.findIndex(t =>
    t && t.toLowerCase().trim() === req.params.title.toLowerCase().trim()
  );
  
  console.log(title[index]+" index "+index+"TITLE"+req.params.title); // Output: 20

if (index !== -1) {

  res.render(__dirname+"/blog.ejs", { tit:title[index],content:text[index] });
} else {
  return res.status(404).send("Blog not found");
}
  console.log(req.params)
  //if (!blog) return res.status(404).send("Blog not found");
  
});
app.post("/delete",(req, res) => {
  title=[];
  text=[];
  res.render(__dirname+"/index.ejs",{title:[],text:[]});

})
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});