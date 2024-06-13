import React, { useContext, useState} from 'react'
import noteContext from "../Context/Notes/NoteContext"

const AddNote = (props) => {
    const context=useContext(noteContext);
const {addNote}=context;
const [note,setNote]=useState({title:"",description:"",tag:""})
const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:" "})
    
    props.showAlert("Added Successfully","success")
}
const onChange=(e)=>{
    //below line means that jo bhi line note me hai wo rahe but jo bhi cheese age likhi ja rahi hai usko add ya overwrite kar dena
    setNote({...note,[e.target.name]:e.target.value})
}
    return (
        <div>
            <div className="container">

                <h1>ADD A NOte</h1>
                <form>
                    <div className="form-group my-3">
                        <label htmlFor="exampleInputEmail1">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" placeholder="Enter your title" onChange={onChange}  minLength={5} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <input type="text" className="form-control" id="description" value={note.description} name="description" placeholder="Enter yout note here" onChange={onChange}  minLength={5} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" value={note.tag} name="tag" placeholder="Enter yout tag here" onChange={onChange} minLength={5} required/>
                    </div>
                    {/* <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
      <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div> */}
                    <button disabled={note.title.length < 5 || note.description.length < 5}type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
