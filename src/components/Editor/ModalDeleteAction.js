import React, { useState, useEffect } from "react"
import CategoriesContext from "../../context/CategoriesContext"
import { DELETE_ITEM } from "../../Types/CategoriesTypes"
import "./modalDelete.scss"
import { Modal, ModalBody, ModalFooter } from "reactstrap"

const ModalDeleteAction = ({
  showModalDelete,
  setshowModalDelete,
  activeCategory,
  setActiveCategory,
}) => {
  const { state, dispatch } = React.useContext(CategoriesContext)

  const handleDelete = (confirm) => {
    confirm && dispatch({ type: DELETE_ITEM, payload: activeCategory })
    setshowModalDelete(false)
  }
  return (
    <div>
      <div>
        <div style={{ color: "white" }}>
          <h4>Tool Box</h4>
        </div>
        <Modal
          isOpen={showModalDelete}
          style={{ top: "5rem" }}
          className="modal-delete-main"
        >
          <ModalBody>
            <div className="modal-text">
              Are you sure you want to delete {activeCategory} &nbsp; ?
            </div>
            <div  className="btn-wrapper">
              <button className="btn-modal" onClick={() => handleDelete(true)}>
                Yes
              </button>
              <button className="btn-modal" onClick={() => handleDelete(false)}>
                No
              </button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  )
}

export default ModalDeleteAction
