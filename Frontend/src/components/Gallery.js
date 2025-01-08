import React, { useState } from "react";

const Gallery = () => {
  const [events, setEvents] = useState([
    { id: 1, image: "https://example.com/image1.jpg", clickedBy: "John Doe" },
    { id: 2, image: "https://example.com/image2.jpg", clickedBy: "Jane Smith" },
  ]);

  const [editEvent, setEditEvent] = useState(null);

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
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!editEvent) return;

    setEvents(events.map((event) => (event.id === editEvent.id ? editEvent : event)));
    setEditEvent(null);
  };

  const handleCancel = () => {
    setEditEvent(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4"> Gallery</h2>

      {editEvent ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-semibold mb-4">Edit Event</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Image URL:</label>
              <input
                type="text"
                name="image"
                value={editEvent.image}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Clicked By:</label>
              <input
                type="text"
                name="clickedBy"
                value={editEvent.clickedBy}
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
          <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicked By</th>
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4">
                    <img src={event.image} alt="Event" className="h-16 w-16 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4">{event.clickedBy}</td>
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

export default Gallery;
