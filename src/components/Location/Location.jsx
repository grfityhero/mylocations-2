import React, { useState, useEffect } from "react"
import MainContext from "../../context/MainContext"
import "./Location.scss"
import { UPDATE_LOCATION, RESET,ACTIVE_LOCATION} from "../../Types/CategoriesTypes"
import { motion } from "framer-motion"
import "../../styles/hover.css"
import { EDIT_MODE } from "../../Types/ToolsTypes"

function Location() {
  const { state, dispatch, toolsState, toolsDispatch } = React.useContext(
    MainContext
  )
  const [messages, setMessages] = useState("")
  const [showMsg, setShowMsg] = useState(false)
  const [showComponent, setShowComponent] = useState(true)
  const [locationState, setlocationState] = useState({
    name: "",
    address: "",
    coordinates: "",
    category: "",
  })
  useEffect(() => {
    console.log(state.activeCategory)
    setlocationState(state.activeLocation)
    if (state.activeCategory !== "") {
      setShowComponent(true)
    } else {
      setShowComponent(false)
    }
  }, [toolsState.editMode, state.activeCategory])

  const handleSubmit = (e) => {
    e.preventDefault()
    toolsDispatch({
      type: EDIT_MODE,
      payload: false,
    })
    setMessages("Updated successfully!")
    setShowMsg(true)
    dispatch({ type: UPDATE_LOCATION, payload: locationState })
    dispatch({ type: RESET })
    setTimeout(() => {
      setShowMsg(false)
      setShowComponent(false)
    }, 1200)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setlocationState(state.activeLocation)
    toolsDispatch({
      type: EDIT_MODE,
      payload: false,
    })
   
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
    <>
      {showComponent && (
        <div className="view-edit-wrapper">
          {!toolsState.editMode ? (
            <div className="view-mode-container">
              <div className="titles">
                <p>Category:</p>
                <p>Name:</p>
                <p>Address:</p>
                <p>Coordinates:</p>
              </div>
              <div className="values">
                <p>{state.activeLocation.category}</p>
                <p>{state.activeLocation.name}</p>
                <p>{state.activeLocation.address}</p>
                <p>{state.activeLocation.coordinates}</p>
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
                  <p className="category-title">{locationState.category}</p>
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
                    <button className="btn-update hvr-bounce-in" type="submit">
                      Update
                    </button>
                    <button
                      className="btn-update hvr-bounce-in"
                      onClick={handleCancel}
                    >
                      cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      {showMsg ? (
        <motion.div
          className="anim1"
          animate={{
            scale: [1, 2, 1, 0],
            rotate: [0, 0, 270, 0],
            borderRadius: ["20%", "20%", "50%", "20%"],
          }}
          transition={{ ease: "easeOut", duration: 1.8 }}
        >
          {messages}
        </motion.div>
      ) : null}
    </>
  )
}

export default Location
