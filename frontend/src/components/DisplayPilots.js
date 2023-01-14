const DisplayPilots = ({pilots}) => {
  if (!pilots) {
    return <p>Loading...</p>
  }

  return (
    pilots.map((p) => {
      return (
        <li key={p.id} tag="bold">
          <h4>{p.firstname} {p.lastname}</h4>
          <ul>
            <li>Drone model: {p.manufacturer} {p.model}</li>
            <li>Closest distance to nest: <span style={{"font-weight": "bold"}}>{(p.distance/1000).toFixed(2)} m</span></li>
            <li>Phone: <span style={{"font-style": "italic"}}>{p.phonenumber}</span></li>
            <li>Email: <span style={{"font-style": "italic"}}>{p.email}</span></li>
          </ul>
        </li>
      )
    })
  )
}

  export default DisplayPilots