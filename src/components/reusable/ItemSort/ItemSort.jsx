import React, { useState, useEffect } from "react"

const ItemSort = ({ sortAsc, setsortAsc }) => {
  
    return (
    <div>
      <button 
      onClick={() => setsortAsc(!sortAsc)} 
      className="btn-update ">
        {sortAsc ? "sort descending  ↓" : "Sort ascending  ↑"}
      </button>
    </div>
  )
}

export default ItemSort
