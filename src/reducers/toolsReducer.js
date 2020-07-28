//tools types
import { SHOWEDITOR, SELECTED_ENTITY, EDIT_MODE } from "../Types/ToolsTypes"
//tools states reducer
export const toolsReducer = (state, action) => {
  switch (action.type) {
    case SHOWEDITOR:
      JSON.stringify({
        ...state,
        showEditor: action.payload,
      })
      return { ...state, showEditor: action.payload }
    case SELECTED_ENTITY:
      //console.log("selected entity is now -", action.payload)
      JSON.stringify({
        ...state,
        selectedentity: action.payload,
      })
      return { ...state, selectedentity: action.payload }
    case EDIT_MODE:
      JSON.stringify({
        ...state,
        editMode: action.payload,
      })
      return { ...state, editMode: action.payload }
    default:
      return state
  }
}
