import React, { useState, useEffect } from "react"
import Category from "../Category/Category"
import "./Categories.scss"
import MainContext from "../../context/MainContext"
import { SHOWEDITOR } from "../../Types/ToolsTypes"
import {
  RESET,
  ACTIVE_CATEGORY,
  ACTIVE_LOCATION,
} from "../../Types/CategoriesTypes"
function Categories() {
  //deconstruct from MainContext
  const { state, dispatch, toolsState, toolsDispatch } = React.useContext(
    MainContext
  )

  /* useEffect(() => {}, [state.categories])
   */
  const toggleActive = (index) => {
    /*  unselect all */
    if (state.categories[index].name === state.activeCategory) {
      dispatch({ type: RESET })
    } else {
      /* set selected category and corresponding location */
      dispatch({ type: ACTIVE_CATEGORY, payload: state.categories[index].name })
      /*   setActiveCategory(state.categories[index].name) */
      /*  setActiveLocation(getCurrentlocation(index)) */
      dispatch({ type: ACTIVE_LOCATION, payload: getCurrentlocation(index) })
      toolsDispatch({
        type: SHOWEDITOR,
        payload: true,
      })
    }
  }

  function getCurrentlocation(index) {
    let tmparr = state.locations.filter(
      (item) => item.category === state.categories[index].name
    )
    console.log(tmparr[0])
    return tmparr[0]
  }
  return (
    <div className="listGroup-wrapper">
      <ul className="list-group category-list">
        {state.categories.map((catItem, index) => (
          <Category
            index={index}
            key={index}
            active={state.activeCategory === catItem.name}
            name={catItem.name}
            toggleActive={() => toggleActive(index)}
          />
        ))}
      </ul>
    </div>
  )
}

export default Categories
