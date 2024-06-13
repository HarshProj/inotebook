import React, { useContext } from 'react'
import noteContext from "../Context/Notes/NoteContext"

const NoteItem = (props) => {
    const context=useContext(noteContext);
    const {deleteNote}=context;
    const { note,updateNote } = props;
    return (
        <div className='col md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title d-inline">{note.title}</h5>
                    <div className="d-inline">
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
    props.showAlert("Deleted Successfully","success")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2 " onClick={()=>{updateNote(note)}}></i>

                    </div>
                    <p className="card-text">{note.description} </p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
