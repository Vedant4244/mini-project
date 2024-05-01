const express= require('express')
const mongoose= require('mongoose')
const app = express()
const port = 5000

mongoose.connect('mongodb://127.0.0.1:27017/musicv4' ,{useNewUrlParser:true,useUnifiedTopology: true})
   .then(()=>{
       console.log("Successfully connected to mongo")
       app.listen(port , ()=>{
           console.log(`port is ${port}`)
       })
   })
   .catch(console.error("error has occurd"));
   
   // http://localhost:4000/musicinsert
app.use(express.json())

const mongoseschema = new mongoose.Schema({
   Song_Name: String,
   Flim_Name: String,
   Music_Director: String,
   Singer: String,
   Actor: String,
   Actress: String
})

const mongodirectory = mongoose.model('songlist',mongoseschema)

app.post('/musicinsert' , async (req,res) => {
   try{
       const document=req.body
       await mongodirectory.insertMany(document)
       res.send("successfully inserted")
   }catch(err){
       console.log("error")
   }
})

app.get('/getcount' , async(req,res) =>{
    try{
        const count = await  mongodirectory.countDocuments()
        const document = await mongodirectory.find()
        res.json({count,document})
    }catch(err){
        console.log("error")
    }
})

app.get('/getspec/:dir' , async(req,res) =>{
    try{
        const doc = req.params.dir
        const documenet =await mongodirectory.find({Music_Director:doc})
        res.json({documenet})
    }catch(err){
        console.log("error")
    }
})
app.get('/musicdic/:dir/musicsig/:sig',async(req,res)=>{
    try
    {
        const dir = req.params.dir;
        const sig = req.params.sig;
        const document = await mongodirectory.find({Music_Director:dir,Song_Name:sig});
        res.json(document);
    }
    catch(err)
    {
        console.log("error");
    }
});
app.get('/getdic/:dir/getsong/:sig' , async(req,res)=>{
    try{
        const doc1 = req.params.dir;
        const doc2 = req.params.sig;
        const document = await mongodirectory.find({Music_Director:doc1},{Song_Name:doc2})
        res.json(document)
    }catch(err){
        console.log("error")
    }
})
app.put("/updatename/:name/:ac/:bc",async(req,res)=>{
    try
    {
        const name = req.params.name;
        const ac = req.params.ac;
        const bc = req.params.bc;
        const doc = await mongodirectory.findOneAndUpdate({Song_Name:name},{Actor:ac,Actress:bc});
        res.json(doc);
    }
    catch{
        console.log("Eroor !!!!!!");
    }
})
app.delete('/musicdel/:del' , async(req,res)=>{
    try{
        const doc = req.params.del
        const document= await mongodirectory.deleteOne({Song_Name:doc})
        res.json(document)
    }catch(err){
        console.log("error")
    }
})





























































// const express = require('express')
// const mongoose = require('mongoose')
// const app = express()
// const PORT = 5000

// mongoose.connect('mongodb://localhost:27017/musicv4' , {useNewURLParser: true,useUnifiedTopology: true})
// .then(() =>{
//     console.log("Successfully connected");
//     app.listen(PORT , ()=>{
//         console.log(`connected to port ${PORT}`);
//     });
// })
// .catch(err =>console.error("Error has occured",err));

// app.use(express.json())

// const mongoschema = new mongoose.Schema({})

// const mongodescribe = mongoose.model('songlist' , mongoschema)

// app.post('/musicinsert' , async(req,res) =>{
//     try{
//         const documenet = req.body
//         mongodescribe.insertMany(documenet)
//         res.send("done")
//     }catch(err){
//         console.log
//     }
// })

