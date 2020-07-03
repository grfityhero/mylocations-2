import React from "react"
import './Navbar.scss'
function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg nav-custom-bg">
        <a className="navbar-brand " href="/#">
          <img
            src="https://placebeard.it/50/50"
            width="50"
            height="50"
            className="d-inline-block align-top rounded"
            alt="some-image"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link menu-item" href="/#">
                Categories <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
