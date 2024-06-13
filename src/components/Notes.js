import React, { useContext, useRef, useState } from 'react'
import AddNote from './AddNote';
import noteContext from "../Context/Notes/NoteContext"
import NoteItem from './NoteItem';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  const context = useContext(noteContext);
  let navigation=useNavigate();
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })
  useEffect(() => {
    return () => {
      // eslint-disable-next-line 
      if(localStorage.getItem('token')){
          getNotes();
    }
      else{
        navigation('/login')
      }
    }
  }, [])
  const handleClick = (e) => {
    console.log("updating note", note)
    // e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refclose.current.click();
    props.showAlert("Updated Successfully","success")
    // addNote(note.title,note.description,note.tag);
  }
  const onChange = (e) => {
    //below line means that jo bhi line note me hai wo rahe but jo bhi cheese age likhi ja rahi hai usko add ya overwrite kar dena
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const ref = useRef(null)
  const refclose = useRef(null)
  const updateNote = (currentnote) => {
    ref.current.click();
    //To use it we use this as mentioned uin react documentation
    console.log("Clicked")
    setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag })

  }
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-etitle" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlhtmlfor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle"
                    onChange={onChange} name="etitle" value={note.etitle} aria-describedby="emailHelp" minLength={5} required />

                </div>
                <div className="mb-3">
                  <label htmlhtmlfor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlhtmlfor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className=" container row my-3">
        <h1>Your Notes</h1>
        <div className="container">

          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
        })}
      </div>
    </>
  )
}

export default Notes
