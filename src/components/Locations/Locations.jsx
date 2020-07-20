import React, { useEffect, useState } from "react"
import Location from "../Location/Location"
import MainContext from "../../context/MainContext"
import "./Locations.scss"
import LocationsEditor from "../LocationsEditor/LocationsEditor"
import { EDIT_MODE } from "../../Types/ToolsTypes"
import { ACTIVE_CATEGORY, ACTIVE_LOCATION } from "../../Types/CategoriesTypes"

const Locations = () => {
  const { state, dispatch, toolsState, toolsDispatch } = React.useContext(
    MainContext
  )
  /*  const [activeLocation, setActiveLocation] = useState(-1) */
  const [active, setactive] = useState(-1)

  /* Locations editor states */
  const [showAddCatForm, setShowAddCatForm] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showEdit, setShowEhowEdit] = useState(false)
  const [showModalDelete, setshowModalDelete] = useState(false)

  useEffect(() => {
    console.log(active)
  }, [state.activeLocation])

  const handleSetActiveLocation = (index) => {
    /*  setActiveLocation(getCurrentlocation(index)) */
    toolsDispatch({ type: ACTIVE_LOCATION, payload: getCurrentlocation(index) })
    setactive(index)
  }
  function getCurrentlocation(index) {
    console.log()
    let tmparr = state.locations.filter(
      (item) => item.name === state.locations[index].name
    )
    //console.log(tmparr[0])
    return tmparr[0]
  }
  return (
    <div className="locations-section">
      <div className="editortool-title">
        {showEdit && !showAddCatForm && <h6>Editing Tools</h6>}
        {!showEdit && !showAddCatForm && <h6>Locations</h6>}
        {showAddCatForm && <h6>Add Category</h6>}
      </div>
      <div className="locations-editor-wrapper">
        <LocationsEditor />
      </div>

      <div className="section-2">
        <div className="locations-list-wrapper ">
          <ul className="list-group">
            {state.locations.map((location, index) => (
              <li
                className={
                  index === active
                    ? "list-group-item location-item-active"
                    : "list-group-item location-item"
                }
                onClick={() => handleSetActiveLocation(index)}
              >
                {location.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="single-location-wrapper">
            {state.activeLocation.name && (
            <Location />           
          )} 
        </div>
      </div>
    </div>
  )
}

export default Locations
