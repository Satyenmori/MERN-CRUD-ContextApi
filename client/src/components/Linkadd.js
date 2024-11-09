import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/store";

const Linkadd = () => {
  const [user, setUser] = useState({
    title: "",
    linkurl: "",
  });
  const [doc, setDoc] = useState({
    doctitle: "",
    docurl: "",
  });
  const { AuthorizationToken } = useAuth();
  const Navigate = useNavigate();

  const handlInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/api/addlink", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        alert("Add Successfuly");
      } else {
        alert("Data Not add");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Document Add
  const handlInputDoc = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setDoc({ ...doc, [name]: value });
  };

  const handSubmitDoc = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/api/adddoc", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify(doc),
      });
      if (response.ok) {
        alert("Add Successfuly");
      } else {
        alert("Data Not add");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-around"}}>
        <section>
          <main>
            <div className="section-registration">
              <div className="container grid grid-two-cols card w-100 mt-5">
                <div className="registration-image">
                  {/* <img
                  src="/images/signup.jpg"
                  alt="sign up img"
                  width="500"
                  height="500"
                /> */}
                </div>
                <div className="registration-form mt-2">
                  <h1 className="main-heading mb-3 text-center">Links Add</h1>{" "}
                  <br />
                  <form onSubmit={handSubmit}>
                    <div className="input-group flex-nowrap mb-3">
                      <span className="input-group-text" id="addon-wrapping">
                        <i className="fa-solid fa-envelope"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="title"
                        name="title"
                        id="title"
                        aria-label="title"
                        aria-describedby="addon-wrapping"
                        autoComplete="off"
                        value={user.title}
                        onChange={handlInput}
                        required
                      />
                    </div>
                    <div className="input-group flex-nowrap mb-3">
                      <span className="input-group-text" id="addon-wrapping">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        type="linkurl"
                        className="form-control"
                        placeholder="linkurl"
                        name="linkurl"
                        id="linkurl"
                        aria-label="linkurl"
                        aria-describedby="addon-wrapping"
                        autoComplete="off"
                        value={user.linkurl}
                        onChange={handlInput}
                        required
                      />
                    </div>
                    <div className="d-grid mt-4">
                      <button className="btn btn-success " type="submit">
                        Add Links
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </section>
        <section>
          <main>
            <div className="section-registration">
              <div className="container grid grid-two-cols card w-100 mt-5">                
                <div className="registration-form mt-2">
                  <h1 className="main-heading mb-3 text-center">
                    Document Add
                  </h1>{" "}
                  <br />
                  <form onSubmit={handSubmitDoc}>
                    <div className="input-group flex-nowrap mb-3">
                      <span className="input-group-text" id="addon-wrapping">
                        <i className="fa-solid fa-envelope"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="doctitle"
                        name="doctitle"
                        id="doctitle"
                        aria-label="doctitle"
                        aria-describedby="addon-wrapping"
                        autoComplete="off"
                        value={doc.doctitle}
                        onChange={handlInputDoc}
                        required
                      />
                    </div>
                    <div className="input-group flex-nowrap mb-3">
                      <span className="input-group-text" id="addon-wrapping">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="docurl"
                        name="docurl"
                        id="docurl"
                        aria-label="docurl"
                        aria-describedby="addon-wrapping"
                        autoComplete="off"
                        value={doc.docurl}
                        onChange={handlInputDoc}
                        required
                      />
                    </div>
                    <div className="d-grid mt-4">
                      <button className="btn btn-warning " type="submit">
                        Add Documents
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
        </section>
      </div>
    </>
  );
};

export default Linkadd;
