import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
function App() {
  const [file, setFile] = useState()
  const [image,setImage] = useState();
  const handleUpload = (e) => {
    const formData = new FormData() // makes key value pair 
    formData.append('file', file) // key->"file" value-> file
    axios.post('http://localhost:6001/upload', formData)
    .then(res => setImage(res.data.image))
    .catch(err => console.log(err))
  }
  useEffect(() => {
    axios.get('http://localhost:6001/getimage')
    .then(res => console.log(res))
    .catch(err => console.log(err))
  })
  return (
    <div >
      <h1>file Upload</h1>
      <input type="file" onChange={ e => setFile(e.target.files[0])}/>
      <button onClick={handleUpload}>Upload</button>
      <br/>
      <img src={`http://localhost:6001/image/${image}`} alt="photo" style={{width:"200px",height:"200px"}}/>
    </div>
  )
}

export default App
