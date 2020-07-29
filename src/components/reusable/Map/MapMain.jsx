import React, { useState, useEffect } from "react"
import { Map, Marker, Popup, TileLayer } from "react-leaflet"
import "./MainMap.scss"
import MainContext from "../../../context/MainContext"
import { COORDS_FROM_MAP } from "../../../Types/CategoriesTypes"
function MapMain({ itmIndex, handleChange }) {
  const { state, dispatch, toolsState } = React.useContext(MainContext)
  const [position, setposition] = useState(null)
  const [curLocation, setcurLocation] = useState([])

  useEffect(() => {
    let coordArr = []
    let locArr = []
    let newPosition = []
    // eslint-disable-next-line 
    state.locations.map((location) => {
      switch (toolsState.selectedentity) {
        case "categories":
          if (location.category === state.activeCategory) {
            newPosition = [location.coordinatesLat, location.coordinatesLong]
            newPosition[0] &&
              newPosition[1] &&
              /* Push newPositions to array */
              coordArr.push(newPosition)
            locArr.push(location.name)
          }
          break
        case "locations":
          if (location.name === state.activeLocation.name) {
            newPosition = [location.coordinatesLat, location.coordinatesLong]
            newPosition[0] &&
              newPosition[1] &&
              setposition([newPosition[0], newPosition[1]])
            setcurLocation(location.name)
          }
          break
        default:
      }
    })
    if (toolsState.selectedentity === "categories") {
      setposition(coordArr[itmIndex])
      setcurLocation(locArr[itmIndex])
    }
  }, [
    state.activeCategory,
    state.activeLocation,
    toolsState.selectedentity,
    itmIndex,
    state.locations,
  ])
  const handleMapClick = (e) => {
    if (toolsState.selectedentity === "locations" && toolsState.editMode) {
      /* send clicked coordinates to handleChange */
      handleChange(e)
    } else {
      /* reset coordinates in main reducer */
      dispatch({ type: COORDS_FROM_MAP, payload: [] })
    }
  }
  return (
    <div className="map-wrapper">
      {toolsState.editMode && (
        <>
          <div className="map-click">Click on the map to pick coordinates </div>
        </>
      )}
      {position && (
        <>
          <Map onClick={handleMapClick} center={position} zoom={12}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                {state.activeLocation ? (
                  <>
                    <div className="">{state.activeLocation.category}</div>
                    <div className="">{curLocation}</div>
                  </>
                ) : (
                  <>
                    <div className="">{state.activeCategory}</div>
                    <div className="">{curLocation}</div>
                  </>
                )}
              </Popup>
            </Marker>
          </Map>
        </>
      )}
    </div>
  )
}
export default MapMain
