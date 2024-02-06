import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/store";

const Signin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const Navigate = useNavigate();
  const { storeTokenLS } = useAuth();

  const handlInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/auth/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        alert("Login Successfuly");
        const res_data = await response.json();
        storeTokenLS(res_data.token);
        Navigate("/");
      } else {
        alert("wrong incridible");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols card w-25 mt-5">
              <div className="registration-image">
                {/* <img
                  src="/images/signup.jpg"
                  alt="sign up img"
                  width="500"
                  height="500"
                /> */}
              </div>
              <div className="registration-form mt-2">
                <h1 className="main-heading mb-3 text-center">Login</h1> <br />
                <form onSubmit={handSubmit}>
                  <div className="input-group flex-nowrap mb-3">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      id="email"
                      aria-label="email"
                      aria-describedby="addon-wrapping"
                      autoComplete="off"
                      value={user.email}
                      onChange={handlInput}
                      required
                    />
                  </div>
                  <div className="input-group flex-nowrap mb-3">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="fa-solid fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      id="password"
                      aria-label="password"
                      aria-describedby="addon-wrapping"
                      autoComplete="off"
                      value={user.password}
                      onChange={handlInput}
                      required
                    />
                  </div>
                  <div className="d-grid mt-4">
                    <button className="btn btn-primary " type="submit">
                      Login
                    </button>
                  </div>
                  <p className="text-center mt-3">
                    Not Register Please?{" "}
                    <NavLink to="/signup"> Sign Up </NavLink>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Signin;
