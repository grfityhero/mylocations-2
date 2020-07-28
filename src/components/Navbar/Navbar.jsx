import React from "react"
import "./Navbar.scss"
function Navbar() {
  return (
    <div>
      <nav className="navbar nav-custom-bg ">
        <img
          src="https://placebeard.it/50/50"
          width="50"
          height="50"
          className="d-inline-block align-top rounded"
          alt="My Locations App"
        />

        <h5>My Locations App</h5>
      </nav>
    </div>
  )
}

export default Navbar
