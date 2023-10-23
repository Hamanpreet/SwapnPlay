import React from "react";
import { useParams } from "react-router-dom";
import TopNavigationBar from "./TopNavigationBar";

const Toy = () => {
  const { id } = useParams();
  return (
    <div>
      
      <h1>
        This page is going to display specific toy image, description and meetup
        location
      </h1>
      <p>{id} is accesible here</p>
    </div>
  );
};

export default Toy;
