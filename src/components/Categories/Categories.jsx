import React, { useState } from "react"
import Category from "../Category/Category"
import "./Categories.scss"
import CategoriesContext from "../../context/CategoriesContext"

function Categories({
  setshowEditor,
  showEditor,
  activeCategory,
  setActiveCategory,
}) {
  //deconstruct state ,dispatch from CategoriesContext
  const { state } = React.useContext(CategoriesContext)

  const toggleActive = (index) => {
    setActiveCategory(index)
    setshowEditor(!showEditor)
  }
  return (
    <div className="listGroup-wrapper">
      <ul className="list-group category-list">
        {state.categories.map((catItem, index) => (
          <Category
            index={index}
            key={index}
            active={activeCategory === index}
            name={catItem.name}
            toggleActive={() => toggleActive(index)}
          />
        ))}
      </ul>
    </div>
  )
}

export default Categories
