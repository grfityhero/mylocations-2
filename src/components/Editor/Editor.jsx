import React, { useState, useEffect } from "react"
import DeleteIcon from "@material-ui/icons/Delete"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import EditIcon from "@material-ui/icons/Edit"
import CategoriesContext from "../../context/CategoriesContext"
import "./Editor.scss"
import Addnew from "./Addnew"
import ModalDeleteAction from "./ModalDeleteAction"
import BuildIcon from "@material-ui/icons/Build"

const Editor = ({
  showEditor,
  activeCategory,
  setActiveCategory,
  setActiveLocation,
  editMode,
  seteditMode,
}) => {
  const { state, dispatch } = React.useContext(CategoriesContext)
  const [showAddCatForm, setShowAddCatForm] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showEdit, setShowEhowEdit] = useState(false)
  const [showModalDelete, setshowModalDelete] = useState(false)
  useEffect(() => {
    if (activeCategory) {
      setShowDelete(true)
      setShowEhowEdit(true)
    } else {
      setShowDelete(false)
      setShowEhowEdit(false)
    }
  }, [activeCategory])
  const handleAddCat = () => {
    setShowAddCatForm(!showAddCatForm)
  }
  const handleDeleteCategory = () => {
    setshowModalDelete(true)
  }
  const handleEditCategory = () => {
    seteditMode(true)
  }

  return (
    <div className="editor-section container-fluid">
      <div className="tool-icon">
        <BuildIcon />
      </div>
      <div
        className={
          showEditor ? "editor-wrapper mx-auto" : "editor-wrapper-hide mx-auto"
        }
      >
        {/* modal confirm delete */}
        <ModalDeleteAction
          showModalDelete={showModalDelete}
          setshowModalDelete={setshowModalDelete}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          setActiveLocation={setActiveLocation}
        />

        <div className="add-new-category" onClick={handleAddCat}>
          <AddCircleOutlineIcon />
          Add Category
        </div>
        <div className={showAddCatForm ? "formWrapper" : "formWrapper-hide"}>
          <Addnew
            showAddCatForm={showAddCatForm}
            setShowAddCatForm={setShowAddCatForm}
          />
        </div>
        {showDelete && (
          <div className="edit-category" onClick={handleEditCategory}>
            <EditIcon />
            Edit selected Category
          </div>
        )}
        {showEdit && (
          <div className="delete-category" onClick={handleDeleteCategory}>
            <DeleteIcon />
            Delete selected Category
          </div>
        )}
      </div>
    </div>
  )
}

export default Editor
