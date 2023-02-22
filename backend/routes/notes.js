const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require("express-validator");


//ROUTE:1 Get all the notes using : GET "/api/notes/fetchallnotes" Login Required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user});
         
        res.json(notes);
        
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
})




//ROUTE:2 Add a new note using : POST "/api/notes/addnote" Login Required
router.post('/addnote', fetchuser, [
    body("title", "enter a valid title").isLength({min: 3}),
    body("description", "description must be alteast 5 characters").isLength({ min: 5 }),

    ], async (req, res)=>{


    try {
        
    

    //destructuring 
    const {title, description, tag} = req.body;

    //if there are errors return bad requet and the error msg
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    
    const note = new Note({ 
        title, description, tag, user: req.user
    })

    const savedNote = await  note.save();

    res.json(savedNote);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
})


//ROUTE:3 update an existing note using : PUT "/api/notes/updatenote" Login Required
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
  const {title, description, tag} = req.body;

  try {
    
    //create a new object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};


    //find the note to be updated and update it 
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")};

    if(note.user !== req.user){
      return  res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json({note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
  
  });


//ROUTE:4 Delete an existing note using : DELETE "/api/notes/deletenote" obviously Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
  
  try {
    //find the note to be deleted and delete it 
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")};

    //allow deletion only if this note belong to the same user that's why we are comparing ids of the loggedin user and the id
    //of the user the note belongs to
    if(note.user !== req.user){
      return  res.status(401).send("Not Allowed");
    }
  
    note = await Note.findByIdAndDelete(req.params.id);
    // res.json({note});
    res.json({"success": "note has been deleted", note: note});

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
  
  });

module.exports = router