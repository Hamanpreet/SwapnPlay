import React, { useState, useEffect} from "react";
import "../styles/Contacts.scss";

const Contacts = (props) => {
  const contacts = props.contacts;
  return (
    <div className="contacts">
      <div className="requester">
        <h3>{ contacts.requester_first_name }</h3>
      </div>
      <div className="owner">
        <h3>{ contacts.owner_first_name }</h3>
      </div>
    </div>
    
  );
};

export default Contacts;