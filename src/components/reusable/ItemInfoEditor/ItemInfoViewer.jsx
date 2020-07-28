import React, { useEffect, useState } from "react"
import MainContext from "../../../context/MainContext"
import "./ItemInfoViewer.scss"
function ItemInfoViewer({ setitmIndex, itmIndex }) {
  const { state, toolsState } = React.useContext(MainContext)

  const [groupedLocation, setGroupedLocation] = useState([])
  useEffect(() => {
    /* Categories */
    if (toolsState.selectedentity === "categories") {
    
      let arr = state.locations.filter(
        (item) => item.category === state.activeCategory
      )
      /* if more then one location present-
      assign the filtered locations array to current category */
      if (arr.length > 1) {
        setGroupedLocation(arr)
      } else {
        /* Back to single location in array so set index to zero */
        setitmIndex(0)
        setGroupedLocation(arr)
      }
    } else {
      /* Locations */
      let arr = state.locations.filter(
        (item) => item.name === state.activeLocation.name
      )
      setGroupedLocation(arr)
      
    }
  }, [
    toolsState.selectedentity,
    state.activeCategory,
    state.activeLocation,
    itmIndex,setitmIndex, state.categories, state.locations
  ])
  useEffect(() => {
    /* resete item index each time the active category change. */
    setitmIndex(0)
  }, [state.activeCategory,setitmIndex])
  const handleNextLocation = () => {
    if (groupedLocation.length > 1 && itmIndex < groupedLocation.length - 1) {
      setitmIndex(itmIndex + 1)
    } else {
      //console.log("NO")
    }
    // //console.log(itmIndex)
  }
  const handlePrevLocation = () => {
    if (groupedLocation.length > 1 && !itmIndex < 1) {
      setitmIndex(itmIndex - 1)
    } else {
      //console.log("NO")
    }
    /*   //console.log(groupedLocation.length)
    //console.log(itmIndex) */
  }
  return (
    <>
      {toolsState.selectedentity === "categories" && (
        <div className="buttons-next-prev-wrapper ">
          <button
            className="btn-next-prev hvr-bounce-in"
            disabled={groupedLocation.length === 1 || itmIndex === 0}
            onClick={handlePrevLocation}
          >
            <i
              className="fa fa-step-backward icons-prev-next"
              aria-hidden="true"
            ></i>
          </button>
          <button
            className="btn-next-prev hvr-bounce-in"
            disabled={
              groupedLocation.length === 0 ||
              itmIndex === groupedLocation.length - 1
            }
            onClick={handleNextLocation}
          >
            <i
              className="fa fa-step-forward icons-prev-next"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      )}
      <div className="view-mode-container">
        <div className="titles">
          <p>Category:</p>
          <p>Name:</p>
          <p>Address:</p>
          <p>Coordinates:</p>
        </div>
        {groupedLocation.length > 0 ? (
          <div className="values">
            <p>{groupedLocation[itmIndex].category}</p>
            <p>{groupedLocation[itmIndex].name}</p>
            <p>{groupedLocation[itmIndex].address}</p>
            <p>{groupedLocation[itmIndex].coordinatesLat}</p>
            <p>{groupedLocation[itmIndex].coordinatesLong}</p>
          </div>
        ) : (
          <div className="values">
            <p>{state.activeCategory}</p>
            <p>'None'</p>
            <p>'None'</p>
            <p>'None'</p>
          </div>
        )}
      </div>
    </>
  )
}
export default ItemInfoViewer
