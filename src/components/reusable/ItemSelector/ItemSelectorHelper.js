import { SHOWEDITOR } from "../../../Types/ToolsTypes"
import {
  RESET,
  ACTIVE_CATEGORY,
  ACTIVE_LOCATION,
} from "../../../Types/CategoriesTypes"

export function toggleActive(
  index,
  state,
  toolsState,
  dispatch,
  toolsDispatch
) {
  let entity
  toolsState.selectedentity === "categories"
    ? (entity = state.categories)
    : (entity = state.locations)

  /*  unselect item and reset (this action will hide the editor but not the add option) */
  dispatch({ type: RESET })

  if (
    entity[index].name === state.activeCategory ||
    entity[index].name === state.activeLocation.name
  ) {
   /*  dispatch({ type: RESET }) */
  } else {
    /* set selected and corresponding data */

    if (toolsState.selectedentity === "categories") {
      dispatch({
        type: ACTIVE_CATEGORY,
        payload: entity[index].name,
      })
    } else {

      dispatch({
        type: ACTIVE_LOCATION,
        payload: getCurrentlocation(index, entity, state),
      })
    }

    toolsDispatch({
      type: SHOWEDITOR,
      payload: true,
    })
  }
}

function getCurrentlocation(index, entity, state) {
  let tmparr = []
  
    tmparr = state.locations.filter((item) => item.name === entity[index].name)
 

  return tmparr[0]
}
