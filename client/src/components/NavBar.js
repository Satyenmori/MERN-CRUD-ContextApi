import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/store";

const NavBar = () => {
  const { isloggedin } = useAuth();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Navbar
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-4">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contect">
                  Contect
                </NavLink>
              </li>
              {isloggedin ? (
                <li className="nav-item">
                  <NavLink className="btn btn-outline-danger" to="/logout">
                    <i className="fa-solid fa-power-off"></i> Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="btn btn-outline-success" to="/signup">
                      SignUp
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="btn btn-outline-success" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
