import React, { useState, useEffect } from "react"
import CategoriesContext from "../../context/CategoriesContext"
import "./Location.scss"
import { UPDATE_LOCATION} from "../../Types/CategoriesTypes"

function Locations({ activeLocation, editMode, seteditMode }) {
  const { state, dispatch } = React.useContext(CategoriesContext)
  const [locationState, setlocationState] = useState({
    name: "",
    address: "",
    coordinates: "",
    category: "",
  })
  useEffect(() => {
    console.log(editMode)
    setlocationState(activeLocation)
  }, [editMode])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(locationState)
    dispatch({ type: UPDATE_LOCATION, payload: locationState })
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setlocationState(activeLocation)
  }
  const handleChange = (event) => {
    let value = event.target.value
    let name = event.target.name
    console.log(name)
    console.log(value)
    //set the state by adding it the current value
    setlocationState({ ...locationState, [name]: value })
  }
  return (
    <div className="view-edit-wrapper">
      {!editMode ? (
        <div className="view-mode-container">
          <div className="titles">
            <p>Category:</p>
            <p>Name:</p>
            <p>Address:</p>
            <p>Coordinates:</p>
          </div>
          <div className="values">
            <p>{activeLocation.category}</p>
            <p>{activeLocation.name}</p>
            <p>{activeLocation.address}</p>
            <p>{activeLocation.coordinates}</p>
          </div>
        </div>
      ) : (
        <div className="edit-mode-container">
          <div className="titles">
            <p>Category:</p>
            <p>Name:</p>
            <p>Address:</p>
            <p>Coordinates:</p>
          </div>

          <div className="values">
            <form onSubmit={handleSubmit}>
              <p>
                <input
                  type="text"
                  onChange={handleChange}
                  value={locationState.category}
                  name="category"
                ></input>
              </p>
              <p>
                <input
                  type="text"
                  onChange={handleChange}
                  value={locationState.name}
                  name="name"
                ></input>
              </p>
              <p>
                <input
                  type="text"
                  onChange={handleChange}
                  value={locationState.address}
                  name="address"
                ></input>
              </p>
              <p>
                <input
                  type="text"
                  value={locationState.coordinates}
                  onChange={handleChange}
                  name="coordinates"
                ></input>
              </p>
              <div className="btn-wrapper">
                <button className="btn-update" type="submit">
                  Update
                </button>
                <button className="btn-update" onClick={handleCancel}>
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Locations
