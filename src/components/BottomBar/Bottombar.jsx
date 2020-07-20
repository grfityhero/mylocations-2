import React from "react"
import "./Bottombar.scss"
import mainContext from "../../context/MainContext"
import { SELECTED_ENTITY } from "../../Types/ToolsTypes"

const Bottombar = () => {
  const { toolsState, toolsDispatch } = React.useContext(mainContext)

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
          onClick={() =>
            toolsDispatch({ type: SELECTED_ENTITY, payload: "locations" })
          }
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
