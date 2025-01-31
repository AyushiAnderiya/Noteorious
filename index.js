//sbse  pehla mena project initilise kara npm init -y se fir mena express nodemon and ejs install kaara 
// fir mena views k andar file bnai or usko call kara
const express=require ('express');
const app=express();
const path=require ('path');
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
    res.render("index");
})
app.listen(3000);
