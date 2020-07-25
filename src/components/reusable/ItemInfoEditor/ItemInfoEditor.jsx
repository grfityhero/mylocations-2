import React, { useState, useEffect } from "react"
import Select from "react-select"
import MainContext from "../../../context/MainContext"

function ItemInfoEditor({
  locationStateObj,
  setlocationStateObj,
  handleSubmit,
  handleChange,
  handleCancel,
}) {
  const [dropOptions, setDropOptions] = useState([])
  const { state ,toolsState} = React.useContext(MainContext)

  useEffect(() => {
    let tmpArr = []
    state.categories.map((category) => {
      tmpArr.push({ value: category.name, label: category.name })
    })
    setDropOptions(tmpArr)
  }, [state.activeLocation])

  const handleChangeOption = (selectedOption) => {
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
              <Select
                onChange={handleChangeOption}
                defaultInputValue="Assign a Category"
                options={dropOptions}
              />
            ) : (
              <p>
                <input
                  disabled
                  type="text"
                  onChange={handleChange}
                  value={locationStateObj.category}
                  name="category"
                ></input>
              </p>
            )}

            {/*   {locationStateObj.category === "Unassigned Category" ? (
              <Select
                onChange={handleChangeSelect}
                defaultInputValue="Assign a Category"
                options={dropOptions}
              />
            ) : (
              locationStateObj.category
            )} */}
            {/*  <select onChange={handleChangeOption}>
              {state.categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select> */}
          </div>

          <p>
            <input
              type="text"
              onChange={handleChange}
              value={locationStateObj.name}
              name="name"
            ></input>
          </p>
          <p>
            <input
              type="text"
              onChange={handleChange}
              value={locationStateObj.address}
              name="address"
            ></input>
          </p>
          <p>
            <input
              type="text"
              value={locationStateObj.coordinates}
              onChange={handleChange}
              name="coordinates"
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
