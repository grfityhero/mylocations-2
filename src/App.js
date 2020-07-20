import React, { useState, useReducer } from "react"
import "./App.scss"
import Navbar from "./components/Navbar/Navbar"
import Categories from "./components/Categories/Categories"
import Editor from "./components/Editor/Editor"
import MainContext from "./context/MainContext.js"
import Location from "./components/Location/Location"
import Bottombar from "./components/BottomBar/Bottombar"
import Locations from "./components/Locations/Locations"
import { reducer } from "./reducers/MainReducer"
import { toolsReducer } from "./reducers/toolsReducer"
import  initialState  from "./LocalStorage/initialState.js"
import  toolsInitialState  from "./LocalStorage/toolsInitialState.js"


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [toolsState, toolsDispatch] = useReducer(toolsReducer,toolsInitialState)

  return (
    <MainContext.Provider
      value={{ state, dispatch, toolsState, toolsDispatch }}
    >
      <div className="App">
        <Navbar />
        {toolsState.selectedentity === "categories" ? (
          <div className="entity-wrapper container rounded shadow ">
            <div className="editor-component-wrapper">
              <Editor />
            </div>
            <div className="categories-editor-formWrapper">
              <div className="categories-wrapper-main">
                <Categories />
              </div>
              <div className="locations-main-wrapper">
                <Location />
              </div>
            </div>
          </div>
        ) : (
          <div className="entity-wrapper container rounded shadow ">
            <Locations />
          </div>
        )}

        <div className="bottombar-component-wrapper">
          <Bottombar />
        </div>
      </div>
    </MainContext.Provider>
  )
}

export default App
