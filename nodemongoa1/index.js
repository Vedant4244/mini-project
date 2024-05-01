const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 4000;

mongoose.connect('mongodb://127.0.0.1:27017/Music3', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error("Failed to connect to MongoDB:", err));

app.use(express.json());

const musicschema = new mongoose.Schema({
  Song_Name: String,
  Flim_Name: String,
  Music_Director: String,
  Singer: String,
  Actor: String,
  Actress: String
});

const MusicDetails = mongoose.model('Songdetails', musicschema);

app.post('/musicinsert', async (req, res) => {
  try {
    const document = req.body;
    await MusicDetails.insertMany(document);
    res.send("Successfully inserted");
  } catch (err) {
    console.error("Error inserting document:", err);
    res.status(500).send("Internal Server Error");
  }
});
app.get('/musicget',async(req,res)=>{
    try{
        const counts = await MusicDetails.countDocuments();
        const documenet = await MusicDetails.find();
        res.json({counts,documenet});
    }
    catch(err)
    {
        console.log("error");
    }

});

app.get('/musicdic/:dir',async(req,res)=>{
    try
    {
        const doc = req.params.dir;
        const document = await MusicDetails.find({Music_Director:doc});
        res.json(document);
    }
    catch(err)
    {
        console.log("error");
    }
});
app.get('/musicdic/:dir/musicsig/:sig',async(req,res)=>{
    try
    {
        const dir = req.params.dir;
        const sig = req.params.sig;
        const document = await MusicDetails.find({Music_Director:dir,Singer:sig});
        res.json(document);
    }
    catch(err)
    {
        console.log("error");
    }
});

app.delete('/musicdel/:del',async(req,res)=>{
    try
    {
        const del = req.params.del;
    const document  = await MusicDetails.deleteOne({Song_Name:del});
    res.json(document);
    }
    catch(err)
    {
        console.log("error!!!!");
    }
});
app.put("/updatename/:name/:ac/:bc",async(req,res)=>{
  try
  {
      const name = req.params.name;
      const ac = req.params.ac;
      const bc = req.params.bc;
      const doc = await MusicDetails.findOneAndUpdate({Song_Name:name},{Actor:ac,Actress:bc});
      res.json(doc);
  }
  catch{
      console.log("Eroor !!!!!!");
  }
})
app.get('/songs', async (req, res) => {
    try {
        const songs = await MusicDetails.find();
        res.write('<table>');
        res.write('<tr><th>Song Name</th><th>Film</th><th>Music Director</th><th>Singer</th><th>Actor</th><th>Actress</th></tr>');
        songs.forEach(song => {
            res.write(`<tr><td>${song.Song_Name}</td><td>${song.Flim_Name}</td><td>${song.Music_Director}</td><td>${song.Singer}</td><td>${song.Actor || ''}</td><td>${song.Actress || ''}</td></tr>`);
        });
        res.write('</table>');
        res.end();
    } catch (err) {
        console.error('Error retrieving songs:', err);
        res.status(500).send('Internal Server Error');
    }
});
