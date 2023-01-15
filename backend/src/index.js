require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const naughty = require('./Naughty')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const url = process.env.MONGODB_URI

const pilotSchema = new mongoose.Schema({
  id: String,
  timestamp: Date,
  firstname: String,
  lastname: String,
  phonenumber: String,
  email: String,
  sn: String,
  model: String,
  manufacturer: String,
  distance: Number
})
pilotSchema.path('timestamp').index({ expires: '600s' });

const Pilot = mongoose.model('Pilot', pilotSchema)

mongoose.connect(url)
.then((response) => {
  //console.log('connected to MongoDB')
  const savePilot = async () => {
  
    const pilotlist = await naughty.zipNaughty()
    
    await Promise.all(pilotlist.map( async (p) => {
      const foundpilot = await Pilot.findOne({ id: p.pilotId })
      if (!foundpilot) {
        const pilot = new Pilot({
          id: p.pilotId,
          timestamp: p.timestamp,
          firstname: p.firstName,
          lastname: p.lastName,
          phonenumber: p.phoneNumber,
          email: p.email,
          sn: p.serialNumber,
          model: p.model,
          manufacturer: p.manufacturer,
          distance: p.distance
        }) 
        await pilot.save()
        //console.log('drone saved!')
      } else if (foundpilot.distance > p.distance) {
          await foundpilot.updateOne({distance: p.distance})
          //console.log('distance updated')
      }
    }))
  }
  setInterval(() => savePilot(), 2000)
})
.catch ((err) =>
  console.log('error connecting to MongoDB:' + err)
)

app.get('/pilots', async (request, response) => {
  const retrievedb = await Pilot.find({})
  response.send(retrievedb)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})