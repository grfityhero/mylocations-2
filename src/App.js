import React, { useState, useReducer } from "react"
import "./App.scss"
import Navbar from "./components/Navbar/Navbar"
import Categories from "./components/Categories/Categories"
import Editor from "./components/Editor/Editor"
import CategoriesContext from "./context/CategoriesContext.js"
import {
  ADD_ITEM,
  DELETE_ITEM,
  RESET,
  UPDATE_LOCATION,
} from "./Types/CategoriesTypes"
import Locations from "./components/Locations/Locations"

let storageState = localStorage.getItem("state")
let initialState

if (storageState) {
  initialState = JSON.parse(storageState)
} else {
  initialState = {
    categories: [{ name: "category-1" }, { name: "category-2" }],
    location: [
      {
        name: "Name-1",
        address: "addr-1",
        coordinates: "coordinate-1",
        category: "category-1",
      },
      {
        name: "Name-2",
        address: "addr-2",
        coordinates: "coordinate-2",
        category: "category-2",
      },
    ],
  }
}

function App() {
  const [showEditor, setshowEditor] = useState(true)
  const [activeCategory, setActiveCategory] = useState("")
  const [activeLocation, setActiveLocation] = useState("")
  const [editMode, seteditMode] = useState(false)

  const reducer = (state, action) => {
    switch (action.type) {
      case ADD_ITEM: {
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            categories: [...state.categories, { name: action.payload }],
            location: [
              ...state.location,
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
            ...state.location,
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
              ...state.location.filter(
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
            ...state.location.filter(
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
            ...state.location.filter(
              (itm) => itm.category !== action.payload.category
            ),
            action.payload,
          ],
        }
        console.log(tmpState)
        JSON.stringify({
          ...state,
          categories: [...state.categories],
          location: [
            ...state.location.filter(
              (itm) => itm.category !== action.payload.category
            ),
            action.payload,
          ],
        })

        return {
          ...state,
          categories: [...state.categories],

          location: [
            ...state.location.filter(
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
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <CategoriesContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Navbar />
        <div className="container rounded shadow">
          <div className="editor-wrapper">
            <Editor
              showEditor={showEditor}
              setshowEditor={setshowEditor}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              setActiveLocation={setActiveLocation}
              editMode={editMode}
              seteditMode={seteditMode}
            />
          </div>
          <div className="categories-editor-formWrapper">
            <div className="categories-wrapper-main">
              <Categories
                setshowEditor={setshowEditor}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                setActiveLocation={setActiveLocation}
              />
            </div>
            <div className="locations-main-wrapper">
              <Locations
                activeLocation={activeLocation}
                activeCategory={activeCategory}
                editMode={editMode}
                seteditMode={seteditMode}
              />
            </div>
          </div>
        </div>
      </div>
    </CategoriesContext.Provider>
  )
}

export default App
