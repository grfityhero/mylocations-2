import React, { useEffect, useState } from "react"
import MainContext from "../../../context/MainContext"

function ItemInfoViewer() {
  const { state, toolsState } = React.useContext(MainContext)
  const [entity, setentity] = useState([])
  const [activeItem, setactiveItem] = useState([])
  const [itmIndex, setitmIndex] = useState(0)
  const [groupedLocation, setGroupedLocation] = useState([])

  useEffect(() => {
    /* Categories */
    if (toolsState.selectedentity === "categories") {
      setentity(state.categories)
      let arr = state.locations.filter(
        (item) => item.category === state.activeCategory
      )
      /* if more then one location assigned to this category */
      if (arr.length > 0) {
        setGroupedLocation(arr)
      } else {
        setGroupedLocation(arr)
      }
    } else {
      /* Locations */
      setentity(state.locations)
      setactiveItem(state.activeLocation)
    }
  }, [
    toolsState.selectedentity,
    state.activeCategory,
    state.activeLocation,
    itmIndex,
  ])

  const handleNextLocation = () => {
    if (groupedLocation.length > 1 && itmIndex < groupedLocation.length - 1) {
      setitmIndex(itmIndex + 1)
      setactiveItem(groupedLocation[itmIndex])
    } else {
      console.log("NO")
    }
    console.log(groupedLocation.length)
    console.log(itmIndex)
  }

  const handlePrevLocation = () => {
    if (groupedLocation.length > 1 && !itmIndex < 1) {
      setitmIndex(itmIndex - 1)
      setactiveItem(groupedLocation[itmIndex])
    } else {
      console.log("NO")
    }
    console.log(groupedLocation.length)
    console.log(itmIndex)
  }

  return (
    <>
      <div className="buttons-next-prev-wrapper ">
        <button
          disabled={groupedLocation.length === 1 || itmIndex === 0}
          onClick={handlePrevLocation}
          className="btn btn-primary"
        >
          <i class="fa fa-step-backward" aria-hidden="true"></i>
        </button>

        <button
          disabled={
            groupedLocation.length === 1 ||
            itmIndex === groupedLocation.length - 1
          }
          onClick={handleNextLocation}
          className="btn btn-primary"
        >
          <i class="fa fa-step-forward" aria-hidden="true"></i>
        </button>
      </div>

      <div className="view-mode-container">
        <div className="titles">
          <p>Category:</p>
          <p>Name:</p>
          <p>Address:</p>
          <p>Coordinates:</p>
        </div>

        {groupedLocation.length > 0 ? (
          /*  activeItem.map((item) => ( )) */
          <div className="values">
            <p>{groupedLocation[itmIndex].category}</p>
            <p>{groupedLocation[itmIndex].name}</p>
            <p>{groupedLocation[itmIndex].address}</p>
            <p>{groupedLocation[itmIndex].coordinates}</p>
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
