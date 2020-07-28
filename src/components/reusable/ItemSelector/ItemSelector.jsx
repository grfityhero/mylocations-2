import React, { useState, useEffect } from "react"
import Item from "../Item/Item"
import "./ItemSelector.scss"
import MainContext from "../../../context/MainContext"
import { toggleActive } from "./ItemSelectorHelper"
/* import Category from "./../../Category/Category" */
import ItemSort from "./../ItemSort/ItemSort"
import { SORT_ITEMS, GROUP_ITEMS } from "../../../Types/CategoriesTypes"
import { EDIT_MODE } from "../../../Types/ToolsTypes"
import GroupByCategory from "./../ItemGroup/GroupByCategory"
import ItemFilter from "./../ItemFilter/ItemFilter"
function ItemSelector({ setitmIndex }) {
  //deconstruct from MainContext
  const { state, dispatch, toolsDispatch, toolsState } = React.useContext(
    MainContext
  )
  const [entity, setentity] = useState([])
  //sort data or not
  const [sortAsc, setsortAsc] = useState(true)
  const [groupByCategory, setGroupByCategory] = useState(false)
  /* filter */
  const [filter, setFilter] = useState(false)
  useEffect(() => {
    if (groupByCategory) {
      dispatch({ type: GROUP_ITEMS }) /* group locations by category */
    } else {
      dispatch({ type: SORT_ITEMS, payload: "ASC" })
    }
    // eslint-disable-next-line
  }, [groupByCategory])
  /* sort ,group,effect */
  useEffect(() => {
    sortAsc ? dispatchSort("ASC") : dispatchSort("DESC")
    // eslint-disable-next-line
  }, [sortAsc])
  const dispatchSort = (direction) => {
    direction === "ASC"
      ? dispatch({ type: SORT_ITEMS, payload: "ASC" })
      : dispatch({ type: SORT_ITEMS, payload: "DESC" })
  }
  useEffect(() => {
    if (toolsState.selectedentity === "categories") {
      setentity(state.categories)
    } else {
      setentity(state.locations)
    }
  }, [
    toolsState.selectedentity,
    state.categories,
    state.locations,
    state.activeCategory,
    state.activeLocation,
    sortAsc,
  ])
  const callToggle = (index) => {
    /* reset index if moved to other item which might have an index of 0 */
    setitmIndex(0)
    toggleActive(index, state, toolsState, dispatch, toolsDispatch)
    ////console.log(state.activeLocation)
    toolsDispatch({
      type: EDIT_MODE,
      payload: false,
    })
  }
  return (
    <div className="listGroup-wrapper">
      {entity ? (
        <ul className="list-group general-list">
          <ItemSort sortAsc={sortAsc} setsortAsc={setsortAsc} />
          {toolsState.selectedentity !== "categories" && (
            <div>
              <GroupByCategory
                groupByCategory={groupByCategory}
                setGroupByCategory={setGroupByCategory}
              />
              <ItemFilter filter={filter} setFilter={setFilter} />
            </div>
          )}
          {entity.map((catItem, index) => (
            <div key={index}>
         
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
            </div>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
export default ItemSelector
