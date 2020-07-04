import React, { useState } from "react"
import DeleteIcon from "@material-ui/icons/Delete"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import EditIcon from "@material-ui/icons/Edit"
import CategoriesContext from "../../context/CategoriesContext"
import "./Editor.scss"
import Addnew from "./Addnew"
import ModalDeleteAction from "./ModalDeleteAction"

const Editor = ({
  showEditor,
  setshowEditor,
  activeCategory,
  setActiveCategory,
}) => {
  const { state, dispatch } = React.useContext(CategoriesContext)
  const [showAddCatForm, setShowAddCatForm] = useState(false)
  const [showModalDelete, setshowModalDelete] = useState(false)

  const handleAddCat = () => {
     setShowAddCatForm(!showAddCatForm) 
  }
  const handleDeleteCategory = () => {
    setshowModalDelete(true)
  }

  return (
    <div className="editor-section container-fluid">
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
