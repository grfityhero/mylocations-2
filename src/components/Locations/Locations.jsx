import React, { useState, useEffect } from "react"
import CategoriesContext from "../../context/CategoriesContext"
import "./Location.scss"
import { UPDATE_LOCATION, RESET } from "../../Types/CategoriesTypes"
import { motion } from "framer-motion"
import "../../styles/hover.css"
function Locations({ activeCategory, activeLocation, editMode, seteditMode }) {
  const { state, dispatch } = React.useContext(CategoriesContext)
  const [messages, setMessages] = useState("")
  const [showMsg, setShowMsg] = useState(false)
  const [showComonent, setshowComponent] = useState(true)

  const [locationState, setlocationState] = useState({
    name: "",
    address: "",
    coordinates: "",
    category: "",
  })
  useEffect(() => {
    console.log(activeCategory)
    setlocationState(activeLocation)
    if (activeCategory!=='') {
      setshowComponent(true)
    }else{
      setshowComponent(false)
    }
    
  }, [editMode, activeCategory])

  const handleSubmit = (e) => {
    e.preventDefault()
    seteditMode(false)
    setMessages("Updated successfully!")
    setShowMsg(true)

    dispatch({ type: UPDATE_LOCATION, payload: locationState })
    dispatch({ type: RESET })
    setTimeout(() => {
      setShowMsg(false)
      setshowComponent(false)
    }, 1500)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setlocationState(activeLocation)

    seteditMode(false)
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
      {showComonent && (
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
                    <button className="btn-update hvr-bounce-in" onClick={handleCancel}>
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

export default Locations
