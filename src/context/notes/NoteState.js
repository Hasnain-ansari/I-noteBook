import { useState } from "react";
import NoteContext from "./noteContext";

// import { useState } from "react";


//so this NoteState is a function that will be used by context by passing the value 
//syntax for using context api remember it
const NoteState = (props) =>{

    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //get all Note
    const getNotes = async ()=>{
      //api call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',  
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('auth-token'),
        }
      });

      const json = await response.json();
      setNotes(json);
  }

    //add a No te
    const addNote = async (title, description, tag)=>{
        //TODO api call
        //api call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',  
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('auth-token'),
          },
          body: JSON.stringify({title, description, tag}) 
        });

        const note = await response.json();
        setNotes(notes.concat(note))
        
    }
    
    //Delete a Note
    const deleteNote = async (id)=>{
        //TODO api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',  
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('auth-token'),
          }
        }); 
        const json = await response.json(); 
        console.log(json);

        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes)
    }


    //Edit a note
    const editNote = async (id, title, description, tag)=>{
        //api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',  
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('auth-token'),
          },
          body: JSON.stringify({title, description, tag}) 
        }); 
        const json = await response.json(); 
        console.log(json);
      

        let newNotes = JSON.parse(JSON.stringify(notes));
        //logic to edit in client
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
          
        }
        setNotes(newNotes);
    }

    return ( 
        <NoteContext.Provider value ={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;