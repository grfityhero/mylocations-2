//MAIN REDUCER
import {
  ADD_CATEGORY_ITEM,
  ADD_LOCATION_ITEM,
  DELETE_CATEGORY_ITEM,
  DELETE_LOCATION_ITEM,
  RESET,
  UPDATE_LOCATION,
  UPDATE_CATEGORY,
  ACTIVE_CATEGORY,
  ACTIVE_LOCATION,
  SORT_ITEMS,
  GROUP_ITEMS,
  COORDS_FROM_MAP,
  FILTER_ITEMS,
} from "../Types/CategoriesTypes"
import _ from "lodash"
export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIVE_CATEGORY: {
      // //console.log("setting active category action.payload ", action.payload)
      localStorage.setItem(
        "state",
        JSON.stringify({ ...state, activeCategory: action.payload })
      )
      return { ...state, activeCategory: action.payload }
    }
    case ACTIVE_LOCATION: {
      localStorage.setItem(
        "state",
        JSON.stringify({ ...state, activeLocation: action.payload })
      )
      return { ...state, activeLocation: action.payload }
    }
    case ADD_CATEGORY_ITEM: {
      //console.log("adding category: ", action.payload)
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          categories: [...state.categories, { name: action.payload }],
        })
      )
      return {
        ...state,
        categories: [...state.categories, { name: action.payload }],
      }
    }
    case ADD_LOCATION_ITEM: {
      //console.log("addin location: ", action.payload)
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          locations: [
            ...state.locations,
            {
              name: action.payload,
              address: "none",
              coordinatesLat: null,
              coordinatesLong: null,
              category: "Unassigned Category",
            },
          ],
        })
      )
      return {
        ...state,
        locations: [
          ...state.locations,
          {
            name: action.payload,
            address: "none",
            coordinatesLat: null,
            coordinatesLong: null,
            category: "Unassigned Category",
          },
        ],
      }
    }
    case DELETE_CATEGORY_ITEM: {
      //console.log("try to delete category item ", action.payload)
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          categories: [
            ...state.categories.filter((item) => item.name !== action.payload),
          ],
        })
      )
      return {
        ...state,
        categories: [
          ...state.categories.filter((item) => item.name !== action.payload),
        ],
      }
    }
    case DELETE_LOCATION_ITEM: {
      //console.log("deleteing location item ", state.activeLocation)
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          locations: [
            ...state.locations.filter(
              (item) => item.name !== state.activeLocation.name
            ),
          ],
        })
      )
      return {
        ...state,
        locations: [
          ...state.locations.filter(
            (item) => item.name !== state.activeLocation.name
          ),
        ],
      }
    }
    /*UPDATE_LOCATION UPDATE a location object from payload  */
    case UPDATE_LOCATION: {
      console.log("obj : ", action.payload.obj)
      console.log("oldName : ", action.payload.oldName)
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          categories: [...state.categories],
          locations: [
            ...state.locations.filter(
              (itm) => itm.name !== action.payload.oldName
            ),
            action.payload.obj,
          ],
        })
      )
      return {
        ...state,
        categories: [...state.categories],
        locations: [
          ...state.locations.filter(
            (itm) => itm.name !== action.payload.oldName
          ),
          action.payload.obj,
        ],
      }
    }
    /*UPDATE_CATEGORY adding a location object from payload  */
    case UPDATE_CATEGORY: {
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          locations: [
            // eslint-disable-next-line
            ...state.locations.map((itm) => {
              if (itm.category === action.payload.oldName) {
                itm.category = action.payload.newName
              } else {
                return itm
              }
              //return null
            }),
          ],
          categories: [
            ...state.categories.filter(
              (itm) => itm.name !== action.payload.oldName
            ),
            { name: action.payload.newName },
          ],
        })
      )
      return {
        ...state,
        locations: [
          // eslint-disable-next-line
          ...state.locations.map((itm) => {
            if (itm.category === action.payload.oldName) {
              itm.category = action.payload.newName
            } else {
              return itm
            }
            //  return null
          }),
        ],
        categories: [
          ...state.categories.filter(
            (itm) => itm.name !== action.payload.oldName
          ),
          { name: action.payload.newName },
        ],
      }
    }
    case RESET: {
      let initialState
      let storageState = localStorage.getItem("state")
      if (storageState) {
        /* reseting states'*/
        initialState = JSON.parse(storageState)
        /* pull back all  */
        return {
          ...initialState,
          activeCategory: "",
          activeLocation: "",
        }
      } else {
        return { ...state, activeCategory: "", activeLocation: "" }
      }
    }
    case SORT_ITEMS: {
      if (action.payload === "ASC") {
        let sortredCategories = state.categories.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        )
        let sortredCLocations = state.locations.sort((a, b) =>
          a.name > b.name ? 1 : -1
        )
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            categories: [...sortredCategories],
            locations: [...sortredCLocations],
          })
        )
        return {
          ...state,
          categories: [...sortredCategories],
          locations: [...sortredCLocations],
        }
      } else {
        let sortredCategories = state.categories.reverse()
        let sortredCLocations = state.locations.reverse()
        localStorage.setItem(
          "state",
          JSON.stringify({
            ...state,
            categories: [...sortredCategories],
            locations: [...sortredCLocations],
          })
        )
        return {
          ...state,
          categories: [...sortredCategories],
          locations: [...sortredCLocations],
        }
      }
    }
    case GROUP_ITEMS: {
      let groupedLocations = []
      let groupedLocationsTmp = _.groupBy(state.locations, (itm) => {
        // eslint-disable-next-line
        return itm.category === itm.category ? itm.category : "single"
      })
      _.forEach(groupedLocationsTmp, (value) => {
        groupedLocations.push(...value)
      })
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          categories: [...state.categories],
          locations: groupedLocations,
        })
      )
      return {
        ...state,
        categories: [...state.categories],
        locations: groupedLocations,
      }
    }
    case FILTER_ITEMS: {
      //console.log("FILTER_ITEMS ", action.payload)
      let initialState
      let storageState = localStorage.getItem("state")
      if (storageState) {
        /* reseting loations'*/
        initialState = JSON.parse(storageState)
      }
      if (action.payload === "all") {
        /* pull back all filtered location */
        return {
          ...initialState,
        }
      } else {
        /* Filter selected category */
        let filteredLocations = initialState.locations.filter(
          (item) => item.category === action.payload
        )
        return {
          ...state,
          categories: [...state.categories],
          locations: [...filteredLocations],
        }
      }
    }
    case COORDS_FROM_MAP: {
      // //console.log("setting coordss from map " ,action.payload)
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          coordsFromMap: action.payload,
        })
      )
      return {
        ...state,
        coordsFromMap: action.payload,
      }
    }
    default:
      return state
  }
}
