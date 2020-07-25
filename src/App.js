import React, { useState, useReducer } from "react"
import "./App.scss"
import Navbar from "./components/Navbar/Navbar"

/* import Categories from "./components/Categories/Categories"
import Location from "./components/Location/Location"
import Locations from "./components/Locations/Locations"
import CatInfo from "./components/Category/CatInfo" */

import Editor from "./components/reusable/ItemTools/Editor"
import MainContext from "./context/MainContext.js"
import Bottombar from "./components/BottomBar/Bottombar"
import { reducer } from "./reducers/MainReducer"
import { toolsReducer } from "./reducers/toolsReducer"
import initialState from "./LocalStorage/initialState.js"
import toolsInitialState from "./LocalStorage/toolsInitialState.js"
import ItemSelector from "./components/reusable/ItemSelector/ItemSelector"
import ItemInfo from './components/reusable/ItemInfo/ItemInfo';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [toolsState, toolsDispatch] = useReducer(
    toolsReducer,
    toolsInitialState
  )

  return (
    <MainContext.Provider
      value={{ state, dispatch, toolsState, toolsDispatch }}>
    
      <div className="App">
        <Navbar />
  
        
          
          <div className="entity-wrapper container rounded shadow ">
            <div className="editor-component-wrapper">
               <Editor />
            </div>
            <div className="categories-editor-formWrapper">
              <div className="categories-wrapper-main">
                {/*  <Categories /> */}
                <ItemSelector />
              </div>
              <div className="CatInfo-main-wrapper">
               {/*  <CatInfo />  */}
               <ItemInfo/> 
              </div>
            </div>
          </div>
       
       

        <div className="bottombar-component-wrapper">
          <Bottombar />
        </div>
      </div>
    </MainContext.Provider>
  )
}

export default App
