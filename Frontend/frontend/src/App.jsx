import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from "axios"

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/notes')
      .then((res) => {
        console.log(res.data) // yeh dekhne ke liye ki actual structure kya hai
        setNotes(res.data.note || res.data)
      })
      .catch((err) => {
        console.error("Error fetching notes:", err)
      })
  }, [])

function handleSubmit(e){
  e.preventDefault()

  const {title, description} = e.target.elements

  console.log(title.value, description.value)

  axios.post("http://localhost:3000/api/notes",{
    title:title.value,
    description:description.value,
  })
  .then(res=>{
    console.log(res.data)
  })

}

function handleDeleteNote(noteId){
  console.log(noteId)

  const {title, description} = noteId

  axios.delete("http://localhost:3000/api/notes/"+noteId)
  .then(res=>{
    console.log(res.data)
  })


}


  return (
    <>

    <form className='note-create-form' onSubmit={handleSubmit}>
      <input name='title' type='text' placeholder='Enter title'/>
      <input name='description' type='text' placeholder='Enter description'/>
      <button>Create note</button>
    </form>

      <div className='notes'>
        {notes.map((note, index) => (
          <div className='note' key={note._id || index}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={()=>{handleDeleteNote(note._id)}}>Delete</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App