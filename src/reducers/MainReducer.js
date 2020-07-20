import {
  ADD_CATEGORY_ITEM,
  DELETE_CATEGORY_ITEM,
  RESET,
  UPDATE_LOCATION,
  ACTIVE_CATEGORY,
  ACTIVE_LOCATION,
} from "../Types/CategoriesTypes"

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIVE_CATEGORY: {
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
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          categories: [...state.categories, { name: action.payload }],
          locations: [
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
        locations: [
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
    case DELETE_CATEGORY_ITEM: {
      localStorage.setItem(
        "state",
        JSON.stringify({
          ...state,
          categories: [
            ...state.categories.filter(
              (item) => item.name !== state.activeCategory
            ),
          ],
          locations: [
            ...state.locations.filter(
              (item) => item.category !== state.activeCategory
            ),
          ],
        })
      )

      return {
        ...state,
        categories: [
          ...state.categories.filter(
            (item) => item.name !== state.activeCategory
          ),
        ],
        locations: [
          ...state.locations.filter(
            (item) => item.category !== state.activeCategory
          ),
        ],
      }
    }
    case UPDATE_LOCATION: {
      let tmpState = {
        ...state,
        categories: [...state.categories],

        locations: [
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
          locations: [
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

        locations: [
          ...state.locations.filter(
            (itm) => itm.category !== action.payload.category
          ),
          action.payload,
        ],
      }
    }
    case RESET: {
      localStorage.setItem(
        "state",
        JSON.stringify({ ...state, activeCategory: "", activeLocation: "" })
      )
      return { ...state, activeCategory: "", activeLocation: "" }
    }
    default:
      return state
  }
}
