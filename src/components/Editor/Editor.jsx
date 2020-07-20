import React, { useState, useEffect } from "react"
import DeleteIcon from "@material-ui/icons/Delete"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import EditIcon from "@material-ui/icons/Edit"
import MainContext from "../../context/MainContext"
import "./Editor.scss"
import Addnew from "./Addnew"
import ModalDeleteAction from "./ModalDeleteAction"
import BuildIcon from "@material-ui/icons/Build"
import "../../styles/hover.css"
import { EDIT_MODE } from "../../Types/ToolsTypes"

const Editor = () => {
  const { state,  toolsState, toolsDispatch } = React.useContext(
    MainContext
  )
  const [showAddCatForm, setShowAddCatForm] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showEdit, setShowEhowEdit] = useState(false)
  const [showModalDelete, setshowModalDelete] = useState(false)

  useEffect(() => {
    if (state.activeCategory) {
      setShowDelete(true)
      setShowEhowEdit(true)
    } else {
      setShowDelete(false)
      setShowEhowEdit(false)
    }
  }, [state.activeCategory])
  const handleAddCat = () => {
    setShowAddCatForm(!showAddCatForm)
  }
  const handleDeleteCategory = () => {
    setshowModalDelete(true)
  }
  const handleEditCategory = () => {
    toolsDispatch({
      type: EDIT_MODE,
      payload: true,
    })
  }

  return (
    <div className="editor-section container-fluid ">
      <div className="editortool-title">
        {showEdit && !showAddCatForm && <h6>Editing Tools</h6>}
        {!showEdit && !showAddCatForm && <h6>Categories</h6>}
        {showAddCatForm && <h6>Add Category</h6>}
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
          showModalDelete={showModalDelete}
          setshowModalDelete={setshowModalDelete}/>
       
        

        <div className="add-new-category hvr-pulse-grow" onClick={handleAddCat}>
          <AddCircleOutlineIcon className="toolicon" />
          <span className="tool-title">Add Category</span>
        </div>
        <div className={showAddCatForm ? "formWrapper" : "formWrapper-hide"}>
          <Addnew
            showAddCatForm={showAddCatForm}
            setShowAddCatForm={setShowAddCatForm}
          />
        </div>
        {showDelete && !showAddCatForm && (
          <div
            className="edit-category hvr-pulse-grow"
            onClick={handleEditCategory}
          >
            <EditIcon className="toolicon" />
            <span className="tool-title">Edit selected Category</span>
          </div>
        )}
        {showEdit && !showAddCatForm && (
          <div
            className="delete-category hvr-pulse-grow"
            onClick={handleDeleteCategory}
          >
            <DeleteIcon className="toolicon" />
            <span className="tool-title">Delete selected Category</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Editor
