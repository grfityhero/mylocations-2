import React, { useState, useEffect } from "react"
import MainContext from "../../../context/MainContext"
import "./ItemInfo.scss"
import {
  UPDATE_LOCATION,
  UPDATE_CATEGORY,
  ACTIVE_LOCATION,
  RESET,
} from "../../../Types/CategoriesTypes"
import { motion } from "framer-motion"
import "../../../styles/hover.css"
import { EDIT_MODE } from "../../../Types/ToolsTypes"
import ItemInfoViewer from "../ItemInfoEditor/ItemInfoViewer"
import ItemInfoEditor from "../ItemInfoEditor/ItemInfoEditor"

function ItemInfo({ setitmIndex, itmIndex }) {
  const { state, dispatch, toolsState, toolsDispatch } = React.useContext(
    MainContext
  )
  const [messages, setMessages] = useState("")
  const [showMsg, setShowMsg] = useState(false)
  const [showComponent, setShowComponent] = useState(true)

  /* Create an empty object to store a location  */
  const [locationStateObj, setlocationStateObj] = useState({
    name: "",
    address: "",
    coordinatesLat: null,
    coordinatesLong: null,
    category: "",
  })

  useEffect(() => {
    /* entity to store categories or locations state */
    let entity
    if (toolsState.selectedentity === "categories") {
      entity = state.categories
      let tmpArr = state.locations.filter(
        (item) => item.category === state.activeCategory
      )
      if (tmpArr.length > 0) {
        setlocationStateObj(tmpArr[0])
      }
    } else {
      /* locations */
      entity = state.locations
      setlocationStateObj({
        ...state.activeLocation,
        coordinatesLat: null,
        coordinatesLong: null,
      })
    }
    if (state.activeCategory || state.activeLocation !== "") {
      setShowComponent(true)
    } else {
      setShowComponent(false)
    }
  }, [
    toolsState.editMode,
    state.activeCategory,
    state.activeLocation,
    toolsState.selectedentity,
  ])

  /* submit updates to item */
  const handleSubmit = (e) => {
    e.preventDefault()

    toolsDispatch({
      type: EDIT_MODE,
      payload: false,
    })

    /* update category name */
    if (toolsState.selectedentity === "categories") {
      dispatch({
        type: UPDATE_CATEGORY,
        payload: {
          oldName: state.activeCategory,
          newName: locationStateObj.category,
        },
      })
      //console.log(state.activeCategory, locationStateObj)
    } else {
      //console.log("SUBMIT: ", state.activeLocation)
      /* update location object first */
      let locationPayLoad = {
        ...locationStateObj,
        coordinatesLat: state.coordsFromMap[0],
        coordinatesLong: state.coordsFromMap[1],
      }

      /* update location state */
      dispatch({
        type: UPDATE_LOCATION,
        payload: { obj: locationPayLoad, oldName: state.activeLocation.name },
      })

      dispatch({ type: ACTIVE_LOCATION, payload: locationPayLoad })
    }
    dispatch({ type: RESET })
    /*  dispatch({ type: SORT_ITEMS, payload: "ASC" }) */
    setMessages("Updated successfully!")
    setShowMsg(true)
    setTimeout(() => {
      setShowMsg(false)
      setShowComponent(false)
    }, 1200)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setlocationStateObj(state.activeLocation)
    toolsDispatch({
      type: EDIT_MODE,
      payload: false,
    })
    /*  seteditMode(false) */
  }
  const handleChange = (e) => {
    //console.log("handleChange fires")
    e.preventDefault()
    let { value, name } = e.target

    /* //console.log("value: ", value)
    //console.log("name: ", name) */
    /* update a location object first */
    let tmpLocation = {
      ...state.activeLocation,
      [name]: value,
      coordinatesLat: state.coordsFromMap[0],
      coordinatesLong: state.coordsFromMap[1],
    }
    setlocationStateObj(tmpLocation)
  }
  return (
    <>
      {showComponent && (
        <div className="view-edit-wrapper">
          {!toolsState.editMode ? (
            <ItemInfoViewer setitmIndex={setitmIndex} itmIndex={itmIndex} />
          ) : (
            <ItemInfoEditor
              setlocationStateObj={setlocationStateObj}
              locationStateObj={locationStateObj}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleCancel={handleCancel}
            />
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

export default ItemInfo
