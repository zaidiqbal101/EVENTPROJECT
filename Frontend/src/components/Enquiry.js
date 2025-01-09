import React, { useState, useEffect } from "react";
import axios from "axios";

const Enquiry = () => {
  const [events, setEvents] = useState([]); // State to hold event data

  // Fetch data from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/inquiries/getdata");
        const fetchedEvents = response.data.map((event) => ({
          id: event._id,
          name: event.name,
          phone: event.phone,
          email: event.email,
          location: event.location,
          eventType: event.eventType,
          date: event.eventDate.split("T")[0], // Format date to YYYY-MM-DD
          message: event.message,
        }));
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error.message);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Enquiry</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Phone", "Email", "Location", "Event Type", "Date", "Message"].map((header) => (
                <th
                  key={header}
                  className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id}>
                {["name", "phone", "email", "location", "eventType", "date", "message"].map((field) => (
                  <td key={field} className="px-6 py-4">
                    {event[field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enquiry;
