import React, { useState } from "react"
import DeleteIcon from "@material-ui/icons/Delete"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import EditIcon from "@material-ui/icons/Edit"
import CategoriesContext from "../../context/CategoriesContext"

import "./Editor.scss"
import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM } from "../../Types/CategoriesTypes"

const Editor = ({ showEditor, setshowEditor }) => {
  const { state, dispatch } = React.useContext(CategoriesContext)
  const [showAddCatForm, setShowAddCatForm] = useState(false)
  const [newCatName, setnewCatName] = useState("")

  const handleAddCat = () => {
    setShowAddCatForm(!showAddCatForm)
  }
  const handleDeleteCategory = () => {
    dispatch({ type: DELETE_ITEM, payload: 'bla' })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(newCatName)
    dispatch({ type: ADD_ITEM, payload: newCatName })
    setShowAddCatForm(false)
    setshowEditor(false)
  }
  const handleChange = (e) => {
    setnewCatName(e.target.value)
  }
  return (
    <div className="editor-section container-fluid">
      <div
        className={
          showEditor ? "editor-wrapper mx-auto" : "editor-wrapper-hide mx-auto"
        }
      >
        <div className="add-new-category" onClick={handleAddCat}>
          <AddCircleOutlineIcon />
          Add Category
        </div>
        <div className={showAddCatForm ? "formWrapper" : "formWrapper-hide"}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Enter New Category Name"
            />
            <hr />

            <input type="submit" value="Submit"></input>
          </form>
        </div>

        <div className="edit-category">
          <EditIcon />
          Edit selected Category
        </div>
        <div className="delete-category" onClick={handleDeleteCategory}>
          <DeleteIcon />
          Delete selected Category
        </div>
      </div>
    </div>
  )
}

export default Editor
