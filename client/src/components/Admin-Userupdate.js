import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/store";

export const AdminUpdate = () => {
  const [data, setdata] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const params = useParams();
  const Navigate = useNavigate();
  const { AuthorizationToken } = useAuth();

  const getuserbyId = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/admin/users/${params.id}`,
        {
          method: "GET",
          headers: { Authorization: AuthorizationToken },
        }
      );
      const data = await response.json();
      setdata({
        username: data.username,
        email: data.email,
        phone: data.phone,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getuserbyId();
  }, []);
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setdata({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5050/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: AuthorizationToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      alert("User Update Successfuly");
      Navigate("/admin/user");
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
                <h1 className="main-heading mb-3 text-center">
                  Update User Data
                </h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div className="input-group flex-nowrap mb-3">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      name="username"
                      id="username"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      autoComplete="off"
                      onChange={handleInput}
                      value={data.username}
                      required
                    />
                  </div>
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
                      onChange={handleInput}
                      value={data.email}
                      required
                    />
                  </div>
                  <div className="input-group flex-nowrap mb-3">
                    <span className="input-group-text" id="addon-wrapping">
                      <i className="fa-solid fa-phone"></i>
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Phone"
                      name="phone"
                      id="phone"
                      aria-label="phone"
                      aria-describedby="addon-wrapping"
                      autoComplete="off"
                      onChange={handleInput}
                      value={data.phone}
                      required
                    />
                  </div>
                  <div className="d-grid mt-5 mb-4">
                    <button className="btn btn-primary " type="submit">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default AdminUpdate;
