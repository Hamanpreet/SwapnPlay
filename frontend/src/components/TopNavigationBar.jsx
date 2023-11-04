import React, { useState, useEffect } from "react";
import "../styles/TopNavigationBar.scss";
import config from '../config/config';
import LoginButton from "./Login";
import LogoutButton from "./Logout";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from 'react-select';
import NotificationBadge from "./NotificationBadge";

const TopNavigationBar = ({ onSubIdChange, subId, nickname }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedSubFilter, setSelectedSubFilter] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [notification, setNotification] = useState(0);
      
  useEffect(() => {
    if (subId)
    {
      console.log("subId:", subId);
      console.log(
        "Path:",
        `${config.baseUrl}/api/matches/notificationcount/${subId}`
      );
    axios
      .get(`${config.baseUrl}/api/matches/notificationcount/${subId}`)
      .then((response) => {
         setNotification(response.data[0].count);
      })
      .catch((error) => {
        console.error("Error fetching toys data", error);
      });
    }
  }, [subId]);

  // Options for the "Filter by" dropdown
  const filterOptions = [
    { value: 'AgeGroup', label: 'Age Group' },
    { value: 'Condition', label: 'Condition' },
  ];

  // Options for the "Sub-Filter" dropdown based on selected filter
  const subFilterOptions = {
    AgeGroup: [
      { value: 'Ages 0-3', label: '0-3 years' },
      { value: 'Ages 3-5', label: '3-5 years' },
      { value: 'Ages 6-8', label: '6-8 years' },
      { value: 'Ages 9-12', label: '9-12 years' },
    ],
    Condition: [
      { value: 'New', label: 'New' },
      { value: 'Used', label: 'Used' },
      { value: 'Like New', label: 'Like New' },
    ],
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${config.baseUrl}/api/toys/searchQuery`, { searchQuery })
      .then((response) => {
        // Update the search results with the response data
        setSearchResults(response.data);
        console.log("search was successful", response.data);
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
      });
  };

  const handleSubFilterChange = (selectedOption) => {
    setSelectedSubFilter(selectedOption);
  };

  const sendFilterRequest = (filterType, filterValue) => {
   
    axios
    .post(`${config.baseUrl}/api/toys/filter`, { filterType, filterValue })
      .then((response) => {
        if (response.data.length > 0) {
          console.log("Filter request was successful:", response.data);
        } else {
          console.log("No results found for the selected filter.");
        }
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error("Error submitting filter request:", error);
      });
  };

  const handleFilterChange = (selectedOption) => {
    
    setSelectedFilter(selectedOption);
    // setSelectedSubFilter(null);
    // Handle the selected filter (e.g., age group or condition) by sending it to the backend
    // to fetch filtered results

    if (selectedOption.value === "ageGroup" || selectedOption.value === "Condition") {
      sendFilterRequest(selectedOption.value, selectedSubFilter);
    }
      
  };

   return (
     <div className="top-nav-bar">
       <Link to="/" className="top-nav-bar__logo">
         SwapnPlay
       </Link>
       {/* Display welcome message if the user is logged in */}
       {subId && (
         <div className="welcome-message">
           Welcome, {nickname}{" "}
           {/* Replace "User" with the actual user's name */}
         </div>
       )}
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
         <Select
           className="filter-dropdown"
           value={selectedFilter}
           onChange={handleFilterChange}
           options={filterOptions}
           placeholder="Filter by"
         />
         {selectedFilter && (
           <Select
             className="sub-filter-dropdown"
             value={selectedSubFilter}
             onChange={(selectedOption) => {
               // Call the function to update selectedSubFilter
               handleSubFilterChange(selectedOption);
               sendFilterRequest(selectedFilter.value, selectedOption.value);
             }}
             options={subFilterOptions[selectedFilter.value]}
             isDisabled={!selectedFilter}
             placeholder={`Select ${selectedFilter.label}`}
           />
         )}
       </div>
       
       <NotificationBadge notification={notification} />

       <LoginButton onSubIdChange={onSubIdChange} />

       <LogoutButton />
       {/* {searchResults.length > 0 && <ToyListPage toyList={searchResults} />} */}
     </div>
   );
};

export default TopNavigationBar;
