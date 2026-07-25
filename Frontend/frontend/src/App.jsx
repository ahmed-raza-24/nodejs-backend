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

  return (
    <>
      <div className='notes'>
        {notes.map((note, index) => (
          <div className='note' key={note._id || index}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App