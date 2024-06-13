// import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    const host='http://127.0.0.1:5000'
    const notesini=[
      ]
      const [notes,setNotes]=useState(notesini);

      const getNotes=async ()=>{
       const response=await fetch(`${host}/api/notes/fetchallnotes`,{
         method:'GET',
         headers:{
           'auth-token': localStorage.getItem('token'),
         },
       })
       const json=await response.json()
       console.log(json)
       setNotes(json);
     } //Add a note
      const addNote=async (title,description,tag)=>{
       const response=await fetch(`${host}/api/notes/addnote`,{
         method:'POST',
         headers:{
           'Content-Type':'application/json',
           'auth-token': localStorage.getItem('token'),
         },
        body:JSON.stringify({title,description,tag})
       })
       const note= await response.json();
       console.log("Addding a new node")
      //  const note={
      //    "_id": jsonn._id,
      //    "user": jsonn.user,
      //    "title": title,
      //    "description": description,
      //    "tag": tag,
      //    "__v": 0
      //  };
         setNotes(notes.concat(note))
     } //Add a note
      
      
      //Delete a note
        //Too:API call 
        const deleteNote=async (id)=>{
          const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
              'Content-Type':'application/json',
              'auth-token': localStorage.getItem('token'),
            }
          })
          const json= await response.json();
          console.log(json);
          console.log("Deleting the node with id"+id)
          const newNotes=notes.filter((note)=>{return note._id!==id})
          setNotes(newNotes)
        }
      
      //Edit a note
      const editNote=async (id,title,description,tag)=>{
        const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json',
            'auth-token': localStorage.getItem('token'),
          },
          body:JSON.stringify({title,description,tag})
        })
        const json= await response.json();
        console.log(json)
         
        setNotes([...notes.filter(item => item._id!==id),json]);
                

        // let nenotes=JSON.parse(JSON.stringify(notes));
        // for(let i=0;i<nenotes.lenght;i++){
        //   //Api call

        //   //Logic to edit in clint
        //   const element =nenotes[i];
        //   if(element._id===id){
        //     nenotes[i].title=title;
        //     nenotes[i].description=description;
        //     nenotes[i].tag=tag;
        //     break;
        //   }
        // }
        // setNotes(nenotes);
      }
        return (
            <NoteContext.Provider value={{notes,addNote,editNote,deleteNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
 
export default NoteState;