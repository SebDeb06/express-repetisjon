const express = require('express');

const app = express();
const PORT = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const { stringify } = require('querystring');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'forside.html'));
});

app.post('/kommentar', async(req, res) => { 
    const { kallenavn, epost, kommentar} = req.body;
    const NewComment = { kallenavn, epost, kommentar };

    // Les eksisterende data fra JSON-filen
    fs.readFile('kommentar.json', 'utf8', (err, fileData) => { 
        // Start med tom array hvis filen ikke finnes 
        const comments = fileData ? JSON.parse(fileData) : [];
        // Legg til ny data 
        comments.push(NewComment); 
        // Skriv den oppdaterte dataen tilbake til filen 
        fs.writeFile('kommentar.json', JSON.stringify(comments, null, 2), 
    (writeErr) => { 
        res.redirect("/");
      });
    });
 });

 app.get("/kommentar", (req, res) => {
    fs.readFile("kommentar.json", "utf8", (err, fileData) => {
        const comments = JSON.parse(fileData);
        res.json(comments);
    });
});


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);