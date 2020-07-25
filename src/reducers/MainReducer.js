//MAIN REDUCER
import {
  ADD_CATEGORY_ITEM,
  ADD_LOCATION_ITEM,
  DELETE_CATEGORY_ITEM,
  DELETE_LOCATION_ITEM,
  RESET,
  UPDATE_LOCATION,
  ACTIVE_CATEGORY,
  ACTIVE_LOCATION,
  SORT_ITEMS,
} from "../Types/CategoriesTypes"

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIVE_CATEGORY: {
      // console.log("setting active category action.payload ", action.payload)
      localStorage.setItem(
        "state",
        JSON.stringify({ ...state, activeCategory: action.payload })
      )
      return { ...state, activeCategory: action.payload }
    }
    case ACTIVE_LOCATION: {
      // console.log("setting active location")
      localStorage.setItem(
        "state",
        JSON.stringify({ ...state, activeLocation: action.payload })
      )
      return { ...state, activeLocation: action.payload }
    }
    case ADD_CATEGORY_ITEM: {
      console.log("adding category: ", action.payload)
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
      console.log("addin location: ", action.payload)
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,

          locations: [
            ...state.locations,
            {
              name: action.payload,
              address: "none",
              coordinates: "none",
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
            coordinates: "none",
            category: "Unassigned Category",
          },
        ],
      }
    }
    case DELETE_CATEGORY_ITEM: {
      console.log("try to delete category item ", action.payload)
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
      console.log("deleteing location item ", state.activeLocation)
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,

          locations: [
            ...state.locations.filter(
              (item) => item.name !== state.activeLocation.name
            ),

            /*   {
              name: "Unnamed Location",
              address: null,
              coordinates: null,
              category: "Unassigned Category",
            }, */
          ],
        })
      )

      return {
        ...state,

        locations: [
          ...state.locations.filter(
            (item) => item.name !== state.activeLocation.name
          ),

          /*    {
            name: "Unnamed Location",
            address: null,
            coordinates: null,
            category: "Unassigned Category",
          }, */
        ],
      }
    }

    /*UPDATE_LOCATION adding a location object from payload  */
    case UPDATE_LOCATION: {
      console.log("reducer is updating with payload: ", action.payload)
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          categories: [...state.categories],

          locations: [
            ...state.locations.filter(
              (itm) => itm.name !== action.payload.name
            ),
            action.payload,
          ],
        })
      )

      return {
        ...state,
        categories: [...state.categories],

        locations: [
          ...state.locations.filter(
            (itm) => itm.name !== action.payload.name
          ),
          action.payload,
        ],
      }
    }

    case RESET: {
      console.log("reseting")
      localStorage.setItem(
        "state",
        JSON.stringify({ ...state, activeCategory: "", activeLocation: "" })
      )
      return { ...state, activeCategory: "", activeLocation: "" }
    }

    case SORT_ITEMS: {
     
      if (action.payload === 'ASC') {
       
        let sortredCategories = state.categories.sort((a, b) => (a.name > b.name) ? 1 : -1)
        let sortredCLocations = state.locations.sort((a, b) => (a.name > b.name) ? 1 : -1)

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
    default:
      return state
  }
}
