import React, { useState, useEffect } from "react";
import axios from "axios";

const Gallery = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  // New state for zoomed image
  const [zoomedImage, setZoomedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/gallery/getdata`);
        const mappedGallery = response.data.map((item) => ({
          id: item._id,
          image: item.filename,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }));
        setEvents(mappedGallery);
      } catch (error) {
        setError("Error fetching gallery data");
        console.error("Error fetching gallery:", error.response ? error.response.data : error.message);
      }
    };

    fetchGallery();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(null);

    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      await axios.post(`${process.env.REACT_APP_URL}/gallery/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseGallery = await axios.get(`${process.env.REACT_APP_URL}/gallery/getdata`);
      const mappedGallery = responseGallery.data.map((item) => ({
        id: item._id,
        image: item.filename,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
      setEvents(mappedGallery);
      setFile(null);
      setPreviewUrl(null);
    } catch (error) {
      setError("Error uploading file");
      console.error("Error uploading file:", error.response ? error.response.data : error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (event) => {
    setEditEvent(event);
    setIsModalOpen(true);
    setFile(null);
    setPreviewUrl(null);
    setError(null);
  };

  const handleSaveEdit = async () => {
    if (!file) {
      setError("No file selected for update!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      await axios.put(`${process.env.REACT_APP_URL}/gallery/update/${editEvent.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseGallery = await axios.get(`${process.env.REACT_APP_URL}/gallery/getdata`);
      const mappedGallery = responseGallery.data.map((item) => ({
        id: item._id,
        image: item.filename,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
      setEvents(mappedGallery);
      handleCloseModal();
    } catch (error) {
      setError("Error saving edit");
      console.error("Error saving edit:", error.response ? error.response.data : error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (event) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_URL}/gallery/delete/${event.id}`);
      if (response.status === 200) {
        setEvents(events.filter((e) => e.id !== event.id));
        console.log("Item deleted successfully");
      }
    } catch (error) {
      setError('Error deleting gallery item');
      console.error('Error deleting gallery item:', error.response ? error.response.data : error.message);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditEvent(null);
    setFile(null);
    setPreviewUrl(null);
    setError(null);
  };

  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // New handlers for image zoom
  const handleImageClick = (image) => {
    setZoomedImage(image);
  };

  const handleCloseZoom = () => {
    setZoomedImage(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border rounded-md px-3 py-2"
        />
        <button
          onClick={handleFileUpload}
          disabled={!file || uploading}
          className={`${
            uploading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          } text-white px-4 py-2 rounded-md ml-2`}
        >
          {uploading ? "Uploading..." : "+ Upload Image"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
              <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id}>
                <td className="px-6 py-4">
                  <img 
                    src={event.image} 
                    alt="Event" 
                    className="h-20 w-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleImageClick(event.image)}
                  />
                </td>
                <td className="px-6 py-4">{event.createdAt}</td>
                <td className="px-6 py-4">{event.updatedAt}</td>
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

      {/* Edit Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Image</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {editEvent && (
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-2 w-full">
                  <p className="text-sm text-gray-500">Current Image:</p>
                  <img
                    src={editEvent.image}
                    alt="Current"
                    className="h-32 w-32 object-cover rounded border"
                  />
                </div>

                {previewUrl && (
                  <div className="flex flex-col items-center gap-2 w-full">
                    <p className="text-sm text-gray-500">New Image Preview:</p>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded border"
                    />
                  </div>
                )}

                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border rounded-md px-3 py-2 w-full"
                />
                
                <div className="flex gap-2 w-full">
                  <button
                    onClick={handleSaveEdit}
                    disabled={!file || uploading}
                    className={`flex-1 ${
                      uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    } text-white px-4 py-2 rounded-md`}
                  >
                    {uploading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={handleCloseZoom}
        >
          <div className="relative max-w-4xl max-h-[90vh] mx-4" onClick={e => e.stopPropagation()}>
            <button
              onClick={handleCloseZoom}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75"
            >
              ✕
            </button>
            <img
              src={zoomedImage}
              alt="Zoomed"
              className="max-h-[90vh] w-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;