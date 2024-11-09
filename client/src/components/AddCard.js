import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/store";

const AddCard = () => {
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    company: "",
  });
  const { AuthorizationToken } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5050/api/addcard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: AuthorizationToken,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Card added successfully!");
        navigate("/card");
      } else {
        alert("Update Your Plan");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the card.");
    }
  };

  return (
    <div className="container mt-5 w-50">
      <h2 className="text-center mb-5">Add New Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jobTitle" className="form-label">
            Job Title
          </label>
          <input
            type="text"
            className="form-control"
            id="jobTitle"
            name="jobTitle"
            placeholder="Enter your job title"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            type="text"
            className="form-control"
            id="company"
            name="company"
            placeholder="Enter your company name"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCard;
