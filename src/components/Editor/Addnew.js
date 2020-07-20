import React, { useState, useRef } from "react"
import MainContext from "../../context/MainContext"
import { ADD_CATEGORY_ITEM } from "../../Types/CategoriesTypes"
import "./Addnew.scss"
import { motion } from "framer-motion"

function Addnew({ showAddCatForm, setShowAddCatForm }) {
  const inpRef = useRef(null)
  const { state, dispatch } = React.useContext(MainContext)
  const [newCatName, setnewCatName] = useState("")
  const [errorText, seterrorText] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()

    if (newCatName) {
      dispatch({ type: ADD_CATEGORY_ITEM, payload: newCatName })
      setShowAddCatForm(false)
      setnewCatName("")
    } else {
      seterrorText("Nothing has been added.")
      const timer = setTimeout(() => {
        seterrorText("")

        setShowAddCatForm(false)
      }, 1500)
    }
  }
  const handleChange = (e) => {
    setnewCatName(e.target.value)
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
            value={newCatName}
            className="add-input-text"
            type="text"
            onChange={handleChange}
            placeholder="Enter New Category"
          />

          <input type="submit" value="Submit" className="submit-button"></input>
        </form>
      </div>
    </>
  )
}

export default Addnew
