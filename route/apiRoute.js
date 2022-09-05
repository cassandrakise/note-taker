const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/notes', (req, res) => {
    const { note-title, noteTextArea } = req.body;

    if ( noteTitle && noteTextArea) {
        const newNote = {
            noteTitle,
            noteTextArea,
            id: uuid(),
        };
    
    readAndAppend(newNote, './db/db.json');


};

//     let router = fs.readAndAppend('./db/db.json');
//     router = JSON.parse(router);
//     res.json(router);

//     let userNote = {
//         title: req.body.title,
//         text: req.body.text,
//         id: uuidv4(),
//     };

// router.push(userNote);
//     fs.readAndAppend('./db/db.json', JSON.stringify(router));

// });

module.exports = router;