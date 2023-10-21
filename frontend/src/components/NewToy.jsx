import React from "react";

import { useState } from "react";
import axios from "axios";
import "../styles/NewToy.css"

const NewToy = () => {
  const [toyInfo, setToyInfo] = useState({
    name: "",
    ageGroup: "0-3 years",
    value: "$0",
    address: "",
    condition: "New",
    pickupLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setToyInfo({
      ...toyInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the form data to the backend API using Axios
    axios
      .post("toys/create-toy", toyInfo) // Replace with your API endpoint
      .then((response) => {
        console.log("Form data submitted successfully:", response.data);
        // Reset the form fields
        setToyInfo({
          name: "",
          ageGroup: "0-3 years",
          value: "$0",
          address: "",
          condition: "New",
          pickupLocation: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
      });
    };
 

  return (
    <div>
      <h1>Create a New Toy</h1>
      <form onSubmit={handleSubmit} className="form-container">
      <div className="form-label-container">
        <label className="label">Name:</label>
          <input
            type="text"
            name="name"
            value={toyInfo.name}
            onChange={handleChange}
            className="input"
          />        
        <br />
      </div>

        <label className="label">
          Age Group:
          <select name="ageGroup" className="select"
          value={toyInfo.ageGroup} onChange={handleChange}>
            <option value="0-3 years">0-3 years</option>
            <option value="3-6 years">3-6 years</option>
            <option value="5-8 years">5-8 years</option>
            <option value="7-10 years">7-10 years</option>
          </select>
        </label>
        <br />

        <label className="label">
          Value:
          <input
            type="number"
            name="value"
            value={toyInfo.value}
            onChange={handleChange}
            className="input"
          />
        </label>
        <br />

        <label className="label">
          Address:
          <input
            type="text"
            name="address"
            value={toyInfo.address}
            onChange={handleChange}
            className="input"
          />
        </label>
        <br />

        <label className="label">
          Condition:
          <select name="condition" value={toyInfo.condition} onChange={handleChange}
          className="select">
            <option value="New">New</option>
            <option value="Used">Used</option>
            <option value="Like New">Like New</option>
          </select>
        </label>
        <br />

        <label className="label">
          Pickup Location:
          <input
            type="text"
            name="pickupLocation"
            value={toyInfo.pickupLocation}
            onChange={handleChange}
            className="input"
          />
        </label>
        <br />

        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
};

export default NewToy;



