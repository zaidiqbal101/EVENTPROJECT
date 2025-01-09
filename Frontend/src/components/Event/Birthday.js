

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import axios from "axios";

const Birthday = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/event/getdata");
        console.log("Fetched Events:", response.data); // Debugging log to check API response
        // Filter out events missing required fields and ensure the eventType is "Wedding"
        const validEvents = response.data.filter(
          (event) =>
            event.name &&
            event.phone &&
            event.email &&
            event.location &&
            event.eventType === "Birthday" && // Ensure the eventType is "Wedding"
            event.eventDate
        );
        console.log("Valid Events:", validEvents); // Log the valid filtered events
        setEvents(validEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
    console.log("Search Query:", e.target.value); // Debugging log to check search query
  };

  // Filter events by name
  const filteredEvents = events.filter((event) =>
    event.name && event.name.toLowerCase().includes(searchQuery.toLowerCase()) // Ensure name exists before filtering
  );

  console.log("Filtered Events:", filteredEvents); // Log the filtered events to verify the filter works

  const displayedEvents = filteredEvents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Birthday Events</h2>
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border rounded-md px-4 py-2 w-full sm:w-1/5 pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {displayedEvents.length > 0 ? (
              displayedEvents.map((event) => (
                <tr key={event._id} className="border-t">
                  <td className="px-4 py-2">{event.name}</td>
                  <td className="px-4 py-2">{event.phone}</td>
                  <td className="px-4 py-2">{event.email}</td>
                  <td className="px-4 py-2">{event.location}</td>
                  <td className="px-4 py-2">
                    {new Date(event.eventDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No user found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 0}
            className="bg-gray-300 px-3 py-1 rounded-md"
          >
            <ChevronLeft />
          </button>
          <div>
            Page {page + 1} of {totalPages}
          </div>
          <button
            onClick={handleNextPage}
            disabled={page >= totalPages - 1}
            className="bg-gray-300 px-3 py-1 rounded-md"
          >
            <ChevronRight />
          </button>
        </div>
        <div className="mt-4">
          <label className="block font-medium">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="border rounded-md px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Birthday;
