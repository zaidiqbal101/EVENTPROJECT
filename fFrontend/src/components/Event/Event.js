import React, { useState } from "react";
import Wedding from "./Wedding";
import Birthday from "./Birthday";
import Anniversary from "./Anniversary";
import KittyParty from "./KittyParty";

const Event = () => {
  const [selectedEvent, setSelectedEvent] = useState("Wedding");

  const handleDropdownChange = (e) => {
    setSelectedEvent(e.target.value);
  };

  const renderEventContent = () => {
    switch (selectedEvent) {
      case "Wedding":
        return <Wedding />;
      case "Birthday":
        return <Birthday />;
      case "Anniversary":
        return <Anniversary />;
      case "KittyParty":
        return <KittyParty />;
      default:
        return <Wedding />;
    }
  };

  return (
    <div>
      <h1>Event Management</h1>
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="eventDropdown"
          style={{ marginRight: "10px", fontWeight: "bold" }}
        >
          Select Event:
        </label>
        <select
          id="eventDropdown"
          value={selectedEvent}
          onChange={handleDropdownChange}
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "16px",
          }}
        >
          <option value="Wedding">Wedding</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anfniversary</option>
          <option value="KittyParty">Kitty Party</option>
        </select>
      </div>
      <div
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        {renderEventContent()}
      </div>
    </div>
  );
};

export default Event;
