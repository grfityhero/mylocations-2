import React from "react"
import "./ItemSort.scss"
const ItemSort = ({ sortAsc, setsortAsc }) => {
  return (
    <div>
      <div onClick={() => setsortAsc(!sortAsc)} className="div-sort">
        {sortAsc ? "Sort ↓" : "Sort ↑"}
      </div>
    </div>
  )
}
export default ItemSort
