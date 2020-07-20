let toolsStorageState = localStorage.getItem("toolsState")
let toolsInitialState
if (toolsStorageState) {
  toolsInitialState = JSON.parse(toolsStorageState)
} else {
  toolsInitialState = {
    showEditor: true,
    editMode: false,
    selectedentity: "categories",
  }
}
export default toolsInitialState
