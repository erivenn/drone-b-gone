const xml2js = require('xml2js')
const droneapi = require('./droneapi')

const parser = new xml2js.Parser({mergeAttrs : true, explicitArray : false})

const fetchNaughty = async () => {
  const xmldata = await droneapi.retrieveDrones()
  const jsdata = await parser.parseStringPromise(xmldata)
  
  const timestamp = jsdata.report.capture.snapshotTimestamp
  const drones = jsdata.report.capture.drone

  const droneDistance = (x, y) => {
    return (
    // Euclidean distance: Math.hypot(x2-x1, y2-y1)
      Math.hypot(Math.abs(x-250000), Math.abs(y-250000))
    )
  }

  const timestamped = drones.map(drone => ({...drone, timestamp, distance: droneDistance(drone.positionX, drone.positionY)}))
  const naughty = timestamped.filter(drone => drone.distance < 100000)
  return naughty
}

const zipNaughty = async () => {
  const naughty = await fetchNaughty()
  const pilots = await Promise.all(naughty.map( (drone) => {
    return droneapi.retrievePilot(drone.serialNumber)
  }))
  
  const pilotdrone = pilots.map( (pilot, i) => {
   return {...pilot, ...naughty[i]}
  })
  
  return pilotdrone
}
exports.zipNaughty = zipNaughty;