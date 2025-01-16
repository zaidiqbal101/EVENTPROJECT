import React, { useState, useEffect } from "react";
import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config()
const Vlog = () => {

  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ url: "", title: "", description: "" });
  const [error, setError] = useState(null);
  const [showNewEventForm, setShowNewEventForm] = useState(false);

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/blog/getblog`);
        const mappedBlogs = response.data.map((blog) => ({
          id: blog._id,
          url: blog.youtube_url,
          title: blog.title,
          created: blog.created_at,
          updated: blog.updated_at,
          description: blog.description,
        }));
        setEvents(mappedBlogs);
      } catch (error) {
        setError('Error fetching blog posts');
        console.error('Error fetching blogs:', error.response ? error.response.data : error.message);
      }
    };

    fetchBlogs();
  }, []);

  const handleEdit = (event) => {
    setEditEvent({ ...event });
  };

  const handleDelete = async (event) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/blog/delete/${event.id}`);
      setEvents(events.filter((e) => e.id !== event.id));
    } catch (error) {
      setError('Error deleting blog post');
      console.error('Error deleting blog post:', error.response ? error.response.data : error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editEvent) {
      setEditEvent((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setNewEvent((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    if (editEvent) {
      try {
        const response = await axios.put(`${process.env.REACT_APP_URL}/blog/update/${editEvent.id}`, {
          url: editEvent.url,
          title: editEvent.title,
          description: editEvent.description,
        });
        const responseBlogs = await axios.get(`${process.env.REACT_APP_URL}/blog/getblog`);
        const mappedBlogs = responseBlogs.data.map((blog) => ({
          id: blog._id,
          url: blog.youtube_url,
          title: blog.title,
          created: blog.created_at,
          updated: blog.updated_at,
          description: blog.description,
        }));
        setEvents(mappedBlogs);
        setEditEvent(null);
      } catch (error) {
        setError('Error updating blog post');
        console.error('Error updating blog post:', error.response ? error.response.data : error.message);
      }
    } else {
      try {
        await axios.post(`${process.env.REACT_APP_URL}/blog/addblog`, newEvent);
        const responseBlogs = await axios.get(`${process.env.REACT_APP_URL}/blog/getblog`);
        const mappedBlogs = responseBlogs.data.map((blog) => ({
          id: blog._id,
          url: blog.youtube_url,
          title: blog.title,
          created: blog.created_at,
          updated: blog.updated_at,
          description: blog.description,
        }));
        setEvents(mappedBlogs);
        setNewEvent({ url: "", title: "", description: "" });
        setShowNewEventForm(false);
      } catch (error) {
        setError('Error adding new blog post');
        console.error('Error adding new blog post:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleCancel = () => {
    setEditEvent(null);
    setShowNewEventForm(false);
    setNewEvent({ url: "", title: "", description: "" });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Vlog</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        onClick={() => setShowNewEventForm(true)}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mb-4"
      >
        +Add New Vlog
      </button>

      {showNewEventForm || editEvent ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <h3 className="text-xl font-semibold mb-4">{editEvent ? "Edit Blog" : "Add New Blog"}</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">URL:</label>
              <input
                type="text"
                name="url"
                value={editEvent ? editEvent.url : newEvent.url}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title:</label>
              <input
                type="text"
                name="title"
                value={editEvent ? editEvent.title : newEvent.title}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description:</label>
              <textarea
                name="description"
                value={editEvent ? editEvent.description : newEvent.description}
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
                {editEvent ? "Save" : "Add"}
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
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4">
                    <a href={event.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {event.url}
                    </a>
                  </td>
                  <td className="px-6 py-4">{event.title}</td>
                  <td className="px-6 py-4">{event.created}</td>
                  <td className="px-6 py-4">{event.updated}</td>
                  <td className="px-6 py-4">{event.description}</td>
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

export default Vlog;
