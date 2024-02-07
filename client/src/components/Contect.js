import React, { useState } from "react";
import { useAuth } from "../store/store";

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};
const Contect = () => {
  const [contect, setContect] = useState(defaultContactFormData);
  const [userData, setUserdata] = useState(true);

  const {user}= useAuth();

  if (userData && user) {
    setContect({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserdata(false);
  }

  const handlInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContect({ ...contect, [name]: value });
  };

  const handSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5050/contect/add", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contect),
      });
      if (response.ok) {
        alert("Data is Save");
        const res_data = response.json();
        setContect(defaultContactFormData);
      }
      console.log(response);
    } catch (error) {
      console.log("Contect data not save", error);
    }
  };

  return (
    <>
      <>
        <section className="con-bgclor">
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
                    Contact Me !!
                  </h1>{" "}
                  <br />
                  <form onSubmit={handSubmit}>
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
                        value={user.username}
                        onChange={handlInput}
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
                        value={user.email}
                        onChange={handlInput}
                        required
                      />
                    </div>
                    <div className="input-group flex-nowrap mb-3">
                      <span className="input-group-text" id="addon-wrapping">
                        <i className="fa-regular fa-message"></i>
                      </span>
                      <div className="form-floating">
                        <textarea
                          className="form-control "
                          placeholder="Leave a comment here"
                          id="message"
                          name="message"
                          value={contect.message}
                          onChange={handlInput}
                          required
                        ></textarea>
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="d-grid mt-5 mb-4">
                      <button className="btn btn-primary " type="submit">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
          <section className="mt-4">
            <iframe
              title="map my"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1944.9921075834736!2d72.56268596617979!3d23.036394008726585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e856703bfcd75%3A0xdd9ac4f282089ae8!2sGrras%20Solutions%20-%20DevOps%2C%20Data%20Science%2C%20Fullstack%2C%20RedHat%2C%20AWS%2C%20Python%20Training%20in%20Ahmedabad!5e0!3m2!1sen!2sin!4v1704168093105!5m2!1sen!2sin"
              width="100%"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </section>
        </section>
      </>
    </>
  );
};

export default Contect;
