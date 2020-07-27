import React, { useState, useEffect } from "react"
import Item from "../Item/Item"
import "./ItemSelector.scss"
import MainContext from "../../../context/MainContext"
import { toggleActive } from "./ItemSelectorHelper"
/* import Category from "./../../Category/Category" */
import ItemSort from "./../ItemSort/ItemSort"
import { SORT_ITEMS, GROUP_ITEMS, RESET } from "../../../Types/CategoriesTypes"
import { EDIT_MODE } from "../../../Types/ToolsTypes"
import GroupByCategory from "./../ItemGroup/GroupByCategory"
function ItemSelector({setitmIndex}) {
  //deconstruct from MainContext
  const { state, dispatch, toolsDispatch, toolsState } = React.useContext(
    MainContext
  )
  const [entity, setentity] = useState([])
  const [activeItem, setactiveItem] = useState()

  //sort data or not
  const [sortAsc, setsortAsc] = useState(true)
  const [groupByCategory, setGroupByCategory] = useState(false)

  useEffect(() => {
    if (groupByCategory) {
      dispatch({ type: GROUP_ITEMS }) /* group locations by category */
    } else {
      dispatch({ type: SORT_ITEMS, payload: "ASC" })
    }
  }, [groupByCategory])

  /* sort ,group,effect */
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
   
  }, [
    toolsState.selectedentity,
    state.categories,
    state.locations,
    state.activeCategory,
    state.activeLocation,
    sortAsc,
  ])

  const callToggle = (index) => {
    setitmIndex(0) /* reset index if moved to other item which might have an index of 0 */
    
    toggleActive(index, state, toolsState, dispatch, toolsDispatch)
    //console.log(state.activeLocation)
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
         
         {toolsState.selectedentity !== "categories" &&
          <GroupByCategory
            groupByCategory={groupByCategory}
            setGroupByCategory={setGroupByCategory}
          />}

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
