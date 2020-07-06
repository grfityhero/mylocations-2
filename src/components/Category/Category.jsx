import React, { useState } from "react"
import "./Category.scss"


const Category = ({ name, toggleActive, index, active }) => {
  
  return (
    <li
      index={index}
      onClick={toggleActive}
      className={
        active
          ? "list-group-item category-item-active  category-item"
          : "list-group-item category-item"
      }
    >
      {name}
    </li>
  )
}

export default Category
