import React, { useState, useEffect } from "react"
import Category from "../Category/Category"
import "./Categories.scss"
import CategoriesContext from "../../context/CategoriesContext"

function Categories({
  setshowEditor,
  showEditor,
  activeCategory,
  setActiveCategory,
  setActiveLocation,
}) {
  //deconstruct state ,dispatch from CategoriesContext
  const { state } = React.useContext(CategoriesContext)
  useEffect(() => {}, [state.categories])

  const toggleActive = (index) => {
    /* on second click unselect all */
    if (state.categories[index].name === activeCategory) {
      setActiveCategory("")
      setActiveLocation("")
      setshowEditor(!showEditor)
    } else {
      /* set selected category and corresponding location */
      setActiveCategory(state.categories[index].name)
      setActiveLocation(getCurrentlocation(index))
      setshowEditor(!showEditor)
    }
  }
  
  function getCurrentlocation(index) {
    let tmparr = state.location.filter(
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
            active={activeCategory === catItem.name}
            name={catItem.name}
            toggleActive={() => toggleActive(index)}
          />
        ))}
      </ul>
    </div>
  )
}

export default Categories
