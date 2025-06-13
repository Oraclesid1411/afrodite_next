import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Accordeon.css"; // Import du CSS personnalisé

const Accordeon = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <div className="accordeon">
      <div
        className="accordeon-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3>{title}</h3>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <div className="accordeon-content">{children}</div>}
    </div>
  );
};
 

export default Accordeon;
