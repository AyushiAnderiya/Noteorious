//sbse  pehla mena project initilise kara npm init -y se fir mena express nodemon and ejs install kaara 
// fir mena views k andar file bnai or usko call kara
const express=require ('express');
const app=express();
const path=require ('path');
const fs=require('fs');
// fs file ko read karna k liya use hota h 
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname+'public')));
app.use((req,res,next)=>{
    console.log("just checking");
    next();
})
// app.get('/',function(req,res){
//     res.send("started");
// })
app.get('/',(req,res)=>{
    fs.readdir(`./files`,function (err,files) {
    res.render("index",{files:files});        
    })
    
})
app.get('/files/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
        res.render("show",{filename:req.params.filename,filedata:filedata})
    })
    
})
//spilit se sb alag alag array me bn jata h or fir uunhi array ko apan join kar leta h
app.get('/edit/:filename',(req,res)=>{
    res.render("edit",{filename:req.params.filename});
})
app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
        if(err)
        console.error(err)
        else
        res.redirect("/");
    })
    
    
})
app.post('/edit',(req,res)=>{
    fs.rename(`./files/${req.body.oldname}`,`./files/${req.body.newname}`,(err)=>{
        res.redirect("/")
    })
})
app.listen(3000);
