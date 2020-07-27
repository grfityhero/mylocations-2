let storageState = localStorage.getItem("state")
let initialState
if (storageState) {
  initialState = JSON.parse(storageState)
} else {
  initialState = {
    categories: [{ name: "category-1" }, { name: "category-2" }],
    locations: [
      {
        name: "Location-1",
        address: "addr-1",
        coordinatesLat: 53.324311,
        coordinatesLong: -7.899169,
        category: "category-1",
      },
      {
        name: "Location-2",
        address: "addr-2",
        coordinatesLat: 32.182005,
        coordinatesLong: 34.867858,
        category: "category-2",
      },
    ],
    activeCategory: "",
    activeLocation: "",
    coordsFromMap:[]
  }
}
export default initialState
