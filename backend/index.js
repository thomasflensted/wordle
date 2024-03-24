const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const port = process.env.PORT || 3500;

app.use(cors());

app.get("/api/words", (req, res) => {
    fs.readFile("words.txt", "utf-8", (err, data) => {
        if (err) throw err;
        const wordList = data.split("\n");
        res.json(wordList);
    })
})

app.get("/api/allowed", (req, res) => {
    fs.readFile("allowed-guesses.txt", "utf-8", (err, data) => {
        if (err) throw err;
        const allowedGuesses = data.split("\n");
        res.json(allowedGuesses);
    })
})

app.listen(port, () => {
    console.log("Backend running.");
    console.log(`Listening on port ${port}.`);
})