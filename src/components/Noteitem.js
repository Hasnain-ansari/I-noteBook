import React, { useContext }from 'react'
import noteContext from "../context/notes/noteContext"

export const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {note, updateNote} = props; 
    const {deleteNote} = context;
  return (
    <div className="col-md-3 my-3">
        <div className="card row-3" >
            <div className="card-body">
                <div className="d-flex align-items-center">
                <h5 className="card-title">{note.title}</h5>
                 <i className="fa-regular fa-trash-can mx-2" style={{color: "red"}} onClick={()=>{deleteNote(note._id); props.showAlert("deleted successfully", "success");}}></i>
                 <i className="fa-regular fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}} style={{color: "blue"}}></i>
                 {/* <i className="fa-solid fa-eye mx-2" style={{color: "green"}}></i> */}

                </div>
                <p className="card-text">{note.description}</p>
            </div>
            
        </div>
    </div>
  )
}
