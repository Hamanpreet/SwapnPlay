import React from "react";
import ToyListPage from "./ToyList";

const Home = ({searchResults}) => {
  return (
    <div>
      <p>Home Page</p>
      {searchResults.length > 0 && <ToyListPage searchResults={searchResults}/>}
    </div>
  );
};

export default Home;