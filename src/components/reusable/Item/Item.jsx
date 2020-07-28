import React from "react"
import "./Item.scss"

const Item = ({ name, toggleActive, index, active }) => {
  return (
    <li
      index={index}
      onClick={toggleActive}
      className={
        active
          ? "list-group-item general-item-active  general-item"
          : "list-group-item general-item"
      }
    >
      
      {name}
    </li>
  )
}

export default Item
