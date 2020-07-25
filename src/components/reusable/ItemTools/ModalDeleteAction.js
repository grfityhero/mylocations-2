import React, { useEffect, useState } from "react"
import MainContext from "../../../context/MainContext"
import {
  DELETE_CATEGORY_ITEM,
  DELETE_LOCATION_ITEM,
  RESET,
} from "../../../Types/CategoriesTypes"
import "./modalDelete.scss"
import { Modal, ModalBody } from "reactstrap"

const ModalDeleteAction = ({ showModalDelete, setshowModalDelete, entity }) => {
  const { state, dispatch } = React.useContext(MainContext)
  const [active, setActive] = useState()

  /* watch for entity change */
  useEffect(() => {
  
    entity === "categories"
      ? setActive(state.activeCategory)
      : setActive(state.activeLocation)
  
  }, [state.activeCategory, state.activeLocation])

  const handleDelete = (confirm) => {
    if (entity === "categories" && confirm === true) {
      console.log("categories entity->", entity, confirm)
      dispatch({ type: DELETE_CATEGORY_ITEM, payload: state.activeCategory })
      dispatch({ type: RESET })
    } else if (entity === "locations" && confirm === true) {
      console.log("locations entity->", entity, confirm)
      dispatch({ type: DELETE_LOCATION_ITEM, payload: state.activeLocation })
      dispatch({ type: RESET })
    }
    setshowModalDelete(false)
  }
  return (
    <div>
      <div>
        <Modal
          isOpen={showModalDelete}
          style={{ top: "5rem" }}
          className="modal-delete-main"
        >
          <ModalBody>
            <div className="modal-text">
              <h3>DELETE ITEM</h3>
              {entity === "categories" ? (
                <p> Are you sure you want to delete {active} &nbsp; ?</p>
              ) : (
                <p> Are you sure you want to delete {active.name} &nbsp; ?</p>
              )}
            </div>
            <div className="btn-wrapper">
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
