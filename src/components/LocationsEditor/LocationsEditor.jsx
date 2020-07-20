import React, { useState, useEffect } from "react"
import DeleteIcon from "@material-ui/icons/Delete"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import EditIcon from "@material-ui/icons/Edit"
import MainContext from "../../context/MainContext"
import "./LocationsEditor.scss"
import Addnew from "./AddNewLocation"
import ModalDeleteActionLocation from "./ModalDeleteActionLocation"
import BuildIcon from "@material-ui/icons/Build"
import "../../styles/hover.css"
import { EDIT_MODE } from "../../Types/ToolsTypes"

const LocationsEditor = () => {
  const { state, dispatch, toolsState, toolsDispatch } = React.useContext(
    MainContext
  )
  const [showAddCatForm, setShowAddCatForm] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showEdit, setShowEhowEdit] = useState(false)
  const [showModalDelete, setshowModalDelete] = useState(false)

  useEffect(() => {
    if (state.activeLocation) {
      setShowDelete(true)
      setShowEhowEdit(true)
    } else {
      setShowDelete(false)
      setShowEhowEdit(false)
    }
  }, [state.activeLocation])
  const handleAddCat = () => {
    setShowAddCatForm(!showAddCatForm)
  }
  const handleDeleteCategory = () => {
    setshowModalDelete(true)
  }
  const handleEditCategory = () => {
    /* seteditMode(true) */
    dispatch({ type: EDIT_MODE, payload: true })
  }

  return (
    <div className="locations-editor-section container-fluid ">
      <div className="locations-editortool-title">
        {showEdit && !showAddCatForm && <h6>Editing Tools</h6>}
        {!showEdit && !showAddCatForm && <h6>Locations</h6>}
        {showAddCatForm && <h6>Add Location</h6>}
      </div>
      <div className="tool-icon">
        <BuildIcon />
      </div>
      <div
        className={
          toolsState.showEditor
            ? "locations-editor-wrapper"
            : "locations-editor-wrapper-hide"
        }
      >
        {/* modal confirm delete */}
        {/*   <ModalDeleteActionLocation
          showModalDelete={showModalDelete}
          setshowModalDelete={setshowModalDelete}
          activeLocation={activeLocation}
          setactiveLocation={setactiveLocation}
          setActiveLocation={setActiveLocation}
        /> */}

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

export default LocationsEditor
