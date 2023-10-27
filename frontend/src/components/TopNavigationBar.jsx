import React, { useState } from "react";
import "../styles/TopNavigationBar.scss";
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import axios from "axios";
import Home from "./Home";
import { Link } from "react-router-dom";

const TopNavigationBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchResults, setSearchResults] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/toys/searchQuery",{searchQuery})
      .then((response) => {
        // Update the search results with the response data
        setSearchResults(response.data);
        console.log("search was successful", response.data);
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
      });
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    // Handle the selected filter (e.g., age group or condition) by sending it to the backend
    // to fetch filtered results

    if (e.target.value === "ageGroup") {
      axios
        .get("toys", {
          params: { filterBy: "AgeGroup" },
        })
        .then((response) => {
          console.log("Filter by Age Group was successful:", response.data);
          
        })
        .catch((error) => {
          console.error("Error submitting filter request:", error);
        });
    } else if (e.target.value === "Condition") {
      // Make an Axios request to filter by Condition
      axios
        .get("toys", {
          params: { filterBy: "Condition" },
        })
        .then((response) => {
          console.log("Filter by Condition was successful:", response.data);
          
        })
        .catch((error) => {
          console.error("Error submitting filter request:", error);
        
        });
    }
  };

  return (

    <div className="top-nav-bar">
        <Link to="/" className="top-nav-bar__logo">SwapnPlay</Link>
      
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search by toy name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <div className="filter-container">
        <select
          value={selectedFilter}
          onChange={handleFilterChange}
          className="filter-dropdown">
          <option value="All">Filter by...</option>
          <option value="AgeGroup">Age Group</option>
          <option value="Condition">Condition</option>
          {selectedFilter === "AgeGroup" && (
            <div className="age-group-submenu">
              <ul>
                <li>0-3 years</li>
                <li>3-6 years</li>
                <li>5-8 years</li>
                <li>7-10 years</li>
              </ul>
            </div>
          )}
        </select>
      </div>
      <LoginButton />
      <LogoutButton />
    </div>
  );
};

export default TopNavigationBar;
