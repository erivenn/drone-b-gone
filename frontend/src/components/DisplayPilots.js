const DisplayPilots = ({pilots}) => {
  if (!pilots) {
    return <p>Loading...</p>
  } else {
    return (
      pilots.map((p) => {
       return (
         <li key={p.id} tag="bold">
           <h4>{p.firstname} {p.lastname}</h4>
           <ul>
             <li>Drone model: {p.manufacturer} {p.model}</li>
             <li>Closest distance to nest: <span style={{"fontWeight": "bold"}}>{(p.distance/1000).toFixed(2)} m</span></li>
             <li>Phone: <span style={{"fontStyle": "italic"}}>{p.phonenumber}</span></li>
             <li>Email: <span style={{"fontStyle": "italic"}}>{p.email}</span></li>
           </ul>
         </li>
       )
     })
   )
  }
}

  export default DisplayPilots