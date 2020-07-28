import React, { useState, useEffect } from "react"
import DeleteIcon from "@material-ui/icons/Delete"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import EditIcon from "@material-ui/icons/Edit"
import MainContext from "../../../context/MainContext"
import "./Editor.scss"
import Addnew from "./Addnew"
import ModalDeleteAction from "./ModalDeleteAction"
import BuildIcon from "@material-ui/icons/Build"
import "../../../styles/hover.css"
import { EDIT_MODE } from "../../../Types/ToolsTypes"
const Editor = () => {
  const { state, toolsState, toolsDispatch } = React.useContext(MainContext)
  const [showAddItemForm, setShowAddItemForm] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showEdit, setShowEhowEdit] = useState(false)
  const [showModalDelete, setshowModalDelete] = useState(false)
  const [entity, setEntity] = useState(toolsState.selectedentity)
  useEffect(() => {
    setEntity(toolsState.selectedentity)
    if (state.activeCategory || state.activeLocation) {
      setShowDelete(true)
      setShowEhowEdit(true)
    } else {
      setShowDelete(false)
      setShowEhowEdit(false)
    }
  }, [state.activeCategory, state.activeLocation, toolsState.selectedentity])
  const handleAdd = () => {
    setShowAddItemForm(!showAddItemForm)
  }
  const handleDelete = () => {
    setshowModalDelete(true)
  }
  const handleEdit = () => {
    toolsDispatch({
      type: EDIT_MODE,
      payload: true,
    })
  }
  return (
    <div className="editor-section container-fluid ">
      <div className="editortool-title">
        {showEdit && !showAddItemForm && <h6>Editing Tools</h6>}
        {!showEdit &&
          !showAddItemForm &&
          toolsState.selectedentity === "categories" && <h6>Categories</h6>}
        {!showEdit &&
          !showAddItemForm &&
          toolsState.selectedentity === "locations" && <h6>Locations</h6>}
        {showAddItemForm && toolsState.selectedentity === "categories" && (
          <h6>Add Category</h6>
        )}
        {showAddItemForm && toolsState.selectedentity === "locations" && (
          <h6>Add Location</h6>
        )}
      </div>
      <div className="tool-icon">
        <BuildIcon />
      </div>
      <div
        className={
          toolsState.showEditor ? "editor-wrapper" : "editor-wrapper-hide"
        }
      >
        {/* modal confirm delete */}
        <ModalDeleteAction
          entity={entity}
          showModalDelete={showModalDelete}
          setshowModalDelete={setshowModalDelete}
        />
        <div className="add-new-category hvr-pulse-grow" onClick={handleAdd}>
          <AddCircleOutlineIcon className="toolicon" />
          {toolsState.selectedentity === "categories" ? (
            <span className="tool-title">Add Category</span>
          ) : (
            <span className="tool-title">Add Location</span>
          )}
        </div>
        <div className={showAddItemForm ? "formWrapper" : "formWrapper-hide"}>
          <Addnew
            showAddItemForm={showAddItemForm}
            setShowAddItemForm={setShowAddItemForm}
          />
        </div>
        {showDelete && !showAddItemForm && (
          <div className="edit-category hvr-pulse-grow" onClick={handleEdit}>
            <EditIcon className="toolicon" />
            {toolsState.selectedentity === "categories" ? (
              <span className="tool-title">Edit Selected Category</span>
            ) : (
              <span className="tool-title">Edit Selected Location</span>
            )}
          </div>
        )}
        {showEdit && !showAddItemForm && (
          <div
            className="delete-category hvr-pulse-grow"
            onClick={handleDelete}
          >
            <DeleteIcon className="toolicon" />
            {toolsState.selectedentity === "categories" ? (
              <span className="tool-title">Delete Selected Category</span>
            ) : (
              <span className="tool-title">Delete Selected Location</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
export default Editor
