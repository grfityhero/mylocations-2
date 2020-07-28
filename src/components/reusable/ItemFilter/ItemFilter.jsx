import React, { useState, useEffect } from "react"
import "./ItemFilter.scss"
import MainContext from "../../../context/MainContext"
import { FILTER_ITEMS } from "../../../Types/CategoriesTypes"
const ItemFilter = ({ setFilter, filter }) => {
  //deconstruct from MainContext
  const { state, dispatch } = React.useContext(MainContext)
  const [catFilters, setCatFilters] = useState([])
  const [selectedCat, setselectedCat] = useState("all")

  useEffect(() => {
    setCatFilters(state.categories)
  }, [state.locations])

  const handleChangeFilter = (e) => {
    let categorySelected = e.target.value
    setselectedCat(categorySelected)
      dispatch({
      type: FILTER_ITEMS,
      payload: categorySelected,
    }) 
 
  }

  return (
    <div className="filter-section">
      <div className="checks-wrapper">
        <select
          className="select-elm"
          onChange={handleChangeFilter}
          value={selectedCat}
          defaultValue={selectedCat}
        >
          <option value="all">Select Filter</option>
          <option value="all">All</option>

          {catFilters.map((item, i) => (
            <option value={item.name} key={i}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ItemFilter
