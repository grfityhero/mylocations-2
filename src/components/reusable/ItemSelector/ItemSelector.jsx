import React, { useState, useEffect } from "react"
import Item from "../Item/Item"
import "./ItemSelector.scss"
import MainContext from "../../../context/MainContext"
import { toggleActive } from "./ItemSelectorHelper"
/* import Category from "./../../Category/Category" */
import ItemSort from "./../ItemSort/ItemSort"
import { SORT_ITEMS } from "../../../Types/CategoriesTypes"
function ItemSelector() {
  //deconstruct from MainContext
  const { state, dispatch, toolsDispatch, toolsState } = React.useContext(
    MainContext
  )
  const [entity, setentity] = useState([])
  const [activeItem, setactiveItem] = useState()

  //sort data or not
  const [sortAsc, setsortAsc] = useState(true)

  useEffect(() => {
    sortAsc
      ? dispatch({ type: SORT_ITEMS, payload: "ASC" })
      : dispatch({ type: SORT_ITEMS, payload: "DESC" })
  }, [sortAsc])

  useEffect(() => {
    if (toolsState.selectedentity === "categories") {
      setentity(state.categories)
      setactiveItem(state.activeCategory)
    } else {
      setentity(state.locations)
      setactiveItem(state.activeLocation)
    }
    // sortItems()
  }, [
    toolsState.selectedentity,
    state.categories,
    state.locations,
    state.activeCategory,
    state.activeLocation,
    sortAsc,
  ])

  const callToggle = (index) => {
    toggleActive(index, state, toolsState, dispatch, toolsDispatch)
    //console.log(state.activeLocation)
    
  }

  return (
    <div className="listGroup-wrapper">
      {entity ? (
        <ul className="list-group general-list">
         {/*  <ItemSort sortAsc={sortAsc} setsortAsc={setsortAsc} />
 */}
          {entity.map((catItem, index) => (
            <Item
              index={index}
              key={index}
              active={
                toolsState.selectedentity === "categories"
                  ? state.activeCategory === catItem.name
                  : state.activeLocation.name === catItem.name
              }
              name={catItem.name}
              toggleActive={() => callToggle(index)}
            />
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ItemSelector
