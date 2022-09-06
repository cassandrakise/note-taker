const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// Get route for retrieving all notes
router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Post route for submitting feedback
router.post('/notes', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if ( title && text ) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
    
    readAndAppend(newNote, './db/db.json');

    const response = {
        status: 'success',
        body: newNote,
    };

    res.json(response);
} else {
    res.json('Error in saving note');
}

});

router.delete('/notes/:id', (req,res) => { 
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            
            const response = json.filter((newNote) => newNote.id !== noteId);

            writeToFile('./db/db.json', response);

            res.json(`Npte ${noteId} has been deleted`);
        });
});
3
module.exports = router;