import React, { useState, useEffect } from "react"
import MainContext from "../../../context/MainContext"
import {
  ADD_CATEGORY_ITEM,
  ADD_LOCATION_ITEM,
} from "../../../Types/CategoriesTypes"
import "./Addnew.scss"
import { motion } from "framer-motion"

function Addnew({ setShowAddItemForm }) {
  const { dispatch, toolsState } = React.useContext(MainContext)
  const [newItemName, setnewItemName] = useState("")
  const [errorText, seterrorText] = useState("")
  const [entity, setEntity] = useState(toolsState.selectedentity)

  useEffect(() => {
    setEntity(toolsState.selectedentity)
  }, [toolsState.selectedentity])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newItemName) {
      toolsState.selectedentity === "categories"
        ? dispatch({ type: ADD_CATEGORY_ITEM, payload: newItemName })
        : dispatch({ type: ADD_LOCATION_ITEM, payload: newItemName })

      setShowAddItemForm(false)
      setnewItemName("")
    } else {
      seterrorText("Nothing has been added.")
      setTimeout(() => {
        seterrorText("")

        setShowAddItemForm(false)
      }, 1500)
    }
  }
  const handleChange = (e) => {
    setnewItemName(e.target.value)
  }
  return (
    <>
      <div className="add-form-wrapper">
        {errorText !== "" && (
          <motion.div
            className="anim1"
            animate={{
              scale: [1, 2, 1, 0],
              rotate: [0, 0, 270, 0],
              borderRadius: ["20%", "20%", "50%", "20%"],
            }}
            transition={{ ease: "easeOut", duration: 1.8 }}
          >
            {errorText}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            value={newItemName}
            className="add-input-text"
            type="text"
            onChange={handleChange}
            placeholder={
              entity === "categories"
                ? "Enter New Category"
                : "Enter New Location"
            }
          />

          <input type="submit" value="Submit" className="submit-button"></input>
        </form>
      </div>
    </>
  )
}

export default Addnew
