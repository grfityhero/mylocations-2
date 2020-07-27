import React, { useState, useEffect } from "react"
import Select from "react-select"
import MainContext from "../../../context/MainContext"
import "./ItemInfoEditor.scss"

const ItemInfoEditor = ({
  locationStateObj,
  setlocationStateObj,
  handleSubmit,
  handleChange,
  handleCancel,
}) => {
  /*select element options */
  const [dropOptions, setDropOptions] = useState([])
  /*select element Default value */
  const [defVal, setDefVal] = useState({})
  const { state, toolsState } = React.useContext(MainContext)

  useEffect(() => {
    /*Fill the select element */
    let tmpArr = []
    state.categories.map((category) => {
      tmpArr.push({ value: category.name, label: category.name })
    })
    setDropOptions(tmpArr)

    /*Set the select element's default value */
    setDefVal({
      value: locationStateObj.category,
      label: locationStateObj.category,
    })

    console.log('#InfoEditor -refreshed locationStateObj:' ,locationStateObj)
  }, [state.activeLocation, toolsState.showEditor, locationStateObj])

  const handleChangeOption = (selectedOption) => {
    console.log(selectedOption)
    setDefVal(selectedOption)
    setlocationStateObj({ ...locationStateObj, category: selectedOption.value })
  }
  return (
    <div className="edit-mode-container">
      <div className="titles">
        <p>Category:</p>
        <p>Name:</p>
        <p>Address:</p>
        <p>Coordinates:</p>
      </div>

      <div className="values">
        <form onSubmit={handleSubmit}>
          <div className="category-title">
            {toolsState.selectedentity === "locations" ? (
              <>
                <Select
                  value={defVal}
                  className="categories-select"
                  onChange={handleChangeOption}
                  options={dropOptions}
                />
              </>
            ) : (
              <p>
                <input
                  type="text"
                  onChange={handleChange}
                  value={state.activeLocation.category}
                  name="category"
                ></input>
              </p>
            )}
          </div>

          <p>
            <input
              disabled={toolsState.selectedentity === "categories"}
              type="text"
              onChange={handleChange}
              value={locationStateObj.name}
              name="name"
            ></input>
          </p>
          <p>
            <input
              disabled={toolsState.selectedentity === "categories"}
              type="text"
              onChange={handleChange}
              value={locationStateObj.address}
              name="address"
            ></input>
          </p>

          <p>
            <input
              disabled={toolsState.selectedentity === "categories"}
              type="text"
              value={
                state.coordsFromMap[0]
                  ? state.coordsFromMap[0]
                  : locationStateObj.coordinatesLat
              }
              onChange={handleChange}
              name="coordinatesLat"
            ></input>
            <input
              disabled={toolsState.selectedentity === "categories"}
              type="text"
              value={
                state.coordsFromMap[1]
                  ? state.coordsFromMap[1]
                  : locationStateObj.coordinatesLong
              }
              onChange={handleChange}
              name="coordinatesLong"
            ></input>
          </p>
          <div className="btn-wrapper">
            <button className="btn-update hvr-bounce-in" type="submit">
              Update
            </button>
            <button className="btn-update hvr-bounce-in" onClick={handleCancel}>
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ItemInfoEditor
