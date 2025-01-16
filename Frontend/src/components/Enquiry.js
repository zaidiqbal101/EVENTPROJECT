import React, { useState, useEffect } from "react";
import axios from "axios";

const Enquiry = () => {
  const [events, setEvents] = useState([]); // State to hold event data
  const [editEvent, setEditEvent] = useState(null); // State to hold the event being edited

  // Fetch data from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/inquiries/getdata`);
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

  // const handleEdit = (event) => {
  //   setEditEvent(event); // Set the event data to the state for editing
  // };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/inquiries/delete/${eventId}`); // Make API call to delete the event
      setEvents(events.filter((event) => event.id !== eventId)); // Remove the event from state after successful deletion
    } catch (error) {
      console.error("Error deleting event:", error.message);
    }
  };

  const handleSave = async () => {
    if (!editEvent) return;

    try {
      // Ensure that editEvent data is updated correctly
      const updatedEvent = { ...editEvent, eventDate: editEvent.date }; // Adjust date format if necessary

      // Make API call to update the event
      await axios.put(`${process.env.REACT_APP_URL}/inquiries/update/${editEvent.id}`, updatedEvent);

      // Update the state with the new data
      setEvents(events.map((event) => (event.id === editEvent.id ? updatedEvent : event)));

      setEditEvent(null); // Close the edit form
    } catch (error) {
      console.error("Error saving event:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Enquiry</h2>

      {/* Edit Event Form */}
      {editEvent && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-semibold mb-4">Edit Event</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={editEvent.name}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone:</label>
              <input
                type="text"
                name="phone"
                value={editEvent.phone}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={editEvent.email}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location:</label>
              <input
                type="text"
                name="location"
                value={editEvent.location}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Event Type:</label>
              <input
                type="text"
                name="eventType"
                value={editEvent.eventType}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date:</label>
              <input
                type="date"
                name="date"
                value={editEvent.date}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message:</label>
              <textarea
                name="message"
                value={editEvent.message}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditEvent(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Phone", "Email", "Location", "Event Type", "Date", "Message", "Actions"].map((header) => (
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
                  <td key={field} className="px-6 py-4">{event[field]}</td>
                ))}
                <td className="px-6 py-4">
                  {/* <button
                    onClick={() => handleEdit(event)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2 transition-colors"
                  >
                    Edit
                  </button> */}
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enquiry;
