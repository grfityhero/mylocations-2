/* import React, { useState, useReducer, createContext } from "react"
import {
  ADD_ITEM,
  DELETE_ITEM,
  RESET,
  UPDATE_LOCATION,
} from "../Types/CategoriesTypes"
import App from "../App"

const Root = () => {
  const [activeCategory, setActiveCategory] = useState("")
  const [activeLocation, setActiveLocation] = useState("")

  let storageState = localStorage.getItem("state")
  let initialState

  if (storageState) {
    initialState = JSON.parse(storageState)
  } else {
    initialState = {
      categories: [{ name: "category-1" }, { name: "category-2" }],
      location: [
        {
          name: "Location-1",
          address: "addr-1",
          coordinates: [53.324311, -7.899169],
          category: "category-1",
        },
        {
          name: "Location-2",
          address: "addr-2",
          coordinates: [32.182005, 34.867858],
          category: "category-2",
        },
      ],
    }
  }

  const mainReducer = (state, action) => {
    switch (action.type) {
      case ADD_ITEM: {
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            categories: [...state.categories, { name: action.payload }],
            location: [
              ...state.locations,
              {
                name: "none",
                address: "none",
                coordinates: "none",
                category: action.payload,
              },
            ],
          })
        )
        return {
          ...state,
          categories: [...state.categories, { name: action.payload }],
          location: [
            ...state.locations,
            {
              name: "none",
              address: "none",
              coordinates: "none",
              category: action.payload,
            },
          ],
        }
      }
      case DELETE_ITEM: {
        console.log("activeCategory->  ", activeCategory)

        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            categories: [
              ...state.categories.filter(
                (item) => item.name !== activeCategory
              ),
            ],
            location: [
              ...state.locations.filter(
                (item) => item.category !== activeCategory
              ),
            ],
          })
        )

        return {
          ...state,
          categories: [
            ...state.categories.filter((item) => item.name !== activeCategory),
          ],
          location: [
            ...state.locations.filter(
              (item) => item.category !== activeCategory
            ),
          ],
        }
      }
      case UPDATE_LOCATION: {
        let tmpState = {
          ...state,
          categories: [...state.categories],

          location: [
            ...state.locations.filter(
              (itm) => itm.category !== action.payload.category
            ),
            action.payload,
          ],
        }

        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            categories: [...state.categories],
            location: [
              ...state.locations.filter(
                (itm) => itm.category !== action.payload.category
              ),
              action.payload,
            ],
          })
        )

        return {
          ...state,
          categories: [...state.categories],

          location: [
            ...state.locations.filter(
              (itm) => itm.category !== action.payload.category
            ),
            action.payload,
          ],
        }
      }
      case RESET: {
        setActiveCategory("")
        setActiveLocation("")
      }
      default:
        return state
    }
  }

  const MainDataContext = createContext({})
  const [state, dispatch] = useReducer(mainReducer, initialState)
  return (
    <MainDataContext.Provider value={{ state, dispatch }}>
      <App />
    </MainDataContext.Provider>
  )
}

export default Root
 */
