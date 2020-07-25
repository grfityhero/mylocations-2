import React from "react"
import "./Bottombar.scss"
import mainContext from "../../context/MainContext"
import { SELECTED_ENTITY } from "../../Types/ToolsTypes"
import { RESET } from "../../Types/CategoriesTypes"

const Bottombar = () => {
  const { toolsState, toolsDispatch, dispatch } = React.useContext(mainContext)

  const handleToggleEntity = () => {
    toolsDispatch({ type: SELECTED_ENTITY, payload: "locations" })
    dispatch({ type: RESET })
  }
  return (
    <div className="bottombar-section">
      <div className="btn-wrapper-bottombar">
        <button
          onClick={() =>
            toolsDispatch({ type: SELECTED_ENTITY, payload: "categories" })
          }
          className={
            toolsState.selectedentity === "categories"
              ? "btn btn-bottombar btn-selected"
              : "btn btn-bottombar "
          }
        >
          categories
        </button>
        <button
          onClick={handleToggleEntity}
          className={
            toolsState.selectedentity === "locations"
              ? "btn btn-bottombar btn-selected"
              : "btn btn-bottombar "
          }
        >
          locations.
        </button>
      </div>
    </div>
  )
}

export default Bottombar
