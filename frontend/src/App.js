import axios from 'axios'
import { useState, useEffect } from 'react'
import DisplayPilots from './components/DisplayPilots'
import './App.css'
import logo from './rfslogo.png'

const url = '/pilots'

const App = () => {
  const [pilots, setPilots] = useState([])

  useEffect(() => {
    const intervalID = setInterval(() => {
      axios
      .get(url)
      .then(response => {
        setPilots(response.data)
      })
      .catch ( (err) => 
        console.log('Could not fetch data')
      ) 
    }, 2000)
     return () => clearInterval(intervalID)
  },[])

  return (
    <div>
      <div id="top">
        <h1 style={{color: 'teal'}}>Recent NDZ violations</h1>
        <p>Drones owned by the following individuals were detected within 100m of a protected nesting area in the past 10 minutes.</p>
      </div>
      <div id="list">
        <ol>
        <DisplayPilots pilots={pilots} />
        </ol>
      </div>
      <img src={logo} className="Logo" />
    </div>
  )
}

export default App
