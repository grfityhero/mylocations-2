import React, { useState,useEffect } from 'react'
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
  useEffect(() => {

  }, [state.categories])

  const toggleActive = (index) => {
    setActiveCategory(state.categories[index].name)
    setshowEditor(!showEditor)
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
