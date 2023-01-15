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
  pilotid: String,
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

const intid = mongoose.connect(url)
.then((response) => {
  console.log('connected to MongoDB')
  const savePilot = async () => {
  
    const pilotlist = await naughty.zipNaughty()
    
    await Promise.all(pilotlist.map( async (p) => {
      const foundpilot = await Pilot.findOne({ pilotid: p.pilotId })
      if (!foundpilot) {
        const pilot = new Pilot({
          pilotid: p.pilotId,
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
        console.log('drone saved!')
      } else {
        if (foundpilot.distance > p.distance) {
          await foundpilot.updateOne({distance: p.distance})
          console.log('distance updated')
        }
        await foundpilot.updateOne({timestamp: p.timestamp})
      }
    }))
  }
  const intid = setInterval(async () => await savePilot(), 2000)
  return intid
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

const exitHandler = () => {
   intid.then(intid => {
    clearInterval(intid)
    process.exit()
   })
}

// Object to capture process exits and call app specific cleanup function

function noOp() {}

const cleanup = function cleanup(callback) {
  // attach user callback to the process event emitter
  // if no callback, it will still exit gracefully on Ctrl-C
  callback = callback || noOp
  process.on('cleanup',callback)

  // do app specific cleaning before exiting
  process.on('exit', function () {
    process.emit('cleanup')
    console.log('cleanup')
  })

  // catch ctrl+c event and exit normally
  process.on('SIGINT', function () {
    console.log('Ctrl-C...')
    process.exit(2)
  })

  //catch uncaught exceptions, trace, then exit normally
  process.on('uncaughtException', function(e) {
    console.log('Uncaught Exception...')
    console.log(e.stack)
    process.exit(99)
  })
}

cleanup(exitHandler)