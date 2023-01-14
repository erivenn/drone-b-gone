const axios = require('axios')

const retrieveDrones = async () => {
  try {
    const response = await axios.get('http://assignments.reaktor.com/birdnest/drones')
    return response.data
  } catch (error) {
    console.error(error)
}}

const retrievePilot = async (sn) => {
  try { const response = await axios.get(`http://assignments.reaktor.com/birdnest/pilots/${sn}`)
  return response.data
  } catch (error) {
    console.error(error)
}}

exports.retrieveDrones = retrieveDrones;
exports.retrievePilot = retrievePilot;