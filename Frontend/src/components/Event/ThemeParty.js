import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const ThemeParty = () => {
  const [events, setEvents] = useState([
    { id: 1, name: "John Doe", phone: "123-456-7890", email: "john@example.com", location: "New York", date: "2025-02-14", eventType: "Theme Party" },
    { id: 2, name: "Jane Smith", phone: "987-654-3210", email: "jane@example.com", location: "Los Angeles", date: "2025-03-22", eventType: "Theme Party" },
    // Add more events as needed
  ]);

  const [editEvent, setEditEvent] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState(""); // Search state

  const totalPages = Math.ceil(events.length / rowsPerPage);

  const handlePrevPage = () => {
    setPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleChangeRowsPerPage = (e) => {
    const newRowsPerPage = parseInt(e.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleEdit = (event) => {
    setEditEvent({ ...event });
  };

  const handleDelete = (event) => {
    setEvents(events.filter((e) => e.id !== event.id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEvent((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (!editEvent) return;

    setEvents(events.map((event) =>
      event.id === editEvent.id ? editEvent : event
    ));
    setEditEvent(null);
  };

  const handleCancel = () => {
    setEditEvent(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0); // Reset to the first page when search changes
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.eventType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedEvents = filteredEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Theme Party   </h2>

      {/* Search input with icon */}
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border rounded-md px-4 py-2 w-full sm:w-1/5 pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {editEvent ? (
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
              <label className="block text-sm font-medium mb-1">Event Type:</label>
              <input
                type="text"
                name="eventType"
                value={editEvent.eventType}
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
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <div className="flex items-center mb-2 sm:mb-0">
              <select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                className="border rounded-md px-2 py-1 mr-2 text-sm"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
              </select>
              <span className="text-sm text-gray-700">
                Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredEvents.length)} of {filteredEvents.length} entries
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={page === 0}
                className="p-2 rounded-md border enabled:hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm">
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page >= totalPages - 1}
                className="p-2 rounded-md border enabled:hover:bg-gray-100 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedEvents.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4">{event.name}</td>
                  <td className="px-6 py-4">{event.phone}</td>
                  <td className="px-6 py-4">{event.email}</td>
                  <td className="px-6 py-4">{event.location}</td>
                  <td className="px-6 py-4">{event.date}</td>
                  <td className="px-6 py-4">{event.eventType}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event)}
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
      )}
    </div>
  );
};

export default ThemeParty;
