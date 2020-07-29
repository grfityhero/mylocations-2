import React, { useState, useEffect } from "react"
import MainContext from "../../../context/MainContext"
import MapMain from "../Map/MapMain"
import "./ItemInfo.scss"
import {
  UPDATE_LOCATION,
  UPDATE_CATEGORY,
  RESET,
  COORDS_FROM_MAP,
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
  const [locationStateObj, setlocationStateObj] = useState({})
  useEffect(() => {
    /* entity to store categories or locations state */
    if (toolsState.selectedentity === "categories") {
      let tmpArr = state.locations.filter(
        (item) => item.category === state.activeCategory
      )
      if (tmpArr.length > 0) {
        setlocationStateObj(tmpArr[0])
      }
    } else {
      /* locations */
      setlocationStateObj({
        ...state.activeLocation,
        coordinatesLat: state.activeLocation.coordinatesLat,
        coordinatesLong: state.activeLocation.coordinatesLong,
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
    state.locations,
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
    } else {
      /* update location state */
      dispatch({
        type: UPDATE_LOCATION,
        payload: { obj: locationStateObj, oldName: state.activeLocation.name },
      })
    }
    dispatch({ type: RESET })
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
   
  }
  const handleChange = (e) => {
    let tmpLocation = {}
    /* onchange triggered from map click? */
    if (!e.target.name || !e.target.name) {
      /*yes so - update a location object's coords */
      tmpLocation = {
        ...locationStateObj,
        coordinatesLat: e.latlng.lat,
        coordinatesLong: e.latlng.lng,
      }
      setlocationStateObj({ ...tmpLocation })
      /* dispatch to update inputs */
      let tmpArr = []
      tmpArr.push(e.latlng.lat)
      tmpArr.push(e.latlng.lng)
      dispatch({ type: COORDS_FROM_MAP, payload: tmpArr })
    } else {
  
      /* triggered from form inputs*/
      let name = e.target.name
      let value = e.target.value
      /* update a location object  */
      tmpLocation = {
        ...locationStateObj,
        [name]: value,
      }
      setlocationStateObj({ ...tmpLocation })
    }
    
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
      <div className="map-main-wrapper">
        <MapMain
          setitmIndex={setitmIndex}
          itmIndex={itmIndex}
          handleChange={handleChange}
        />
      </div>
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
