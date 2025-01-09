// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Gallery = () => {
//   const [events, setEvents] = useState([]);
//   const [editEvent, setEditEvent] = useState(null);
//   const [error, setError] = useState(null);
//   const [file, setFile] = useState(null);  // State to handle the selected file

//   // Fetch gallery data from the API
//   useEffect(() => {
//     const fetchGallery = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/gallery/getdata');
//         const mappedGallery = response.data.map((item) => ({
//           id: item._id, // Assuming _id is used as the id
//           image: item.filename,
//           createdAt: item.created_at,
//           updatedAt: item.updated_at,
//         }));
//         setEvents(mappedGallery);
//       } catch (error) {
//         setError('Error fetching gallery data');
//         console.error('Error fetching gallery:', error.response ? error.response.data : error.message);
//       }
//     };

//     fetchGallery();
//   }, []);

//   // Handle the file change (file selected)
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Handle delete
//   const handleDelete = async (event) => {
//     try {
//       const response = await axios.delete(`http://localhost:8000/gallery/delete/${event.id}`);
//       if (response.status === 200) {
//         setEvents(events.filter((e) => e.id !== event.id));
//         console.log("Item deleted successfully");
//       }
//     } catch (error) {
//       setError('Error deleting gallery item');
//       console.error('Error deleting gallery item:', error.response ? error.response.data : error.message);
//     }
//   };

//   // Handle file upload (for adding a new image)
//   const handleFileUpload = async (e) => {
//     e.preventDefault(); // Prevent default form submission
  
//     if (!file) {
//       setError('No file selected!');
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("file", file);
  
//     try {
//       const response = await axios.post('http://localhost:8000/gallery/upload', formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
  
//       const responseGallery = await axios.get('http://localhost:8000/gallery/getdata');
//       const mappedGallery = responseGallery.data.map((item) => ({
//         id: item._id,
//         image: item.filename,
//         createdAt: item.created_at,
//         updatedAt: item.updated_at,
//       }));
//       setEvents(mappedGallery);
//       setFile(null);
//     } catch (error) {
//       setError('Error uploading file');
//       console.error('Error uploading file:', error.response ? error.response.data : error.message);
//     }
//   };
  

//   // Handle edit
//   const handleEdit = (event) => {
//     setEditEvent(event);
//     setFile(null); // Reset any previous file selection
//   };

//   // Handle save changes (after editing)
//   const handleSaveEdit = async () => {
//     if (!file) {
//       setError('No file selected for update!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.put(`http://localhost:8000/gallery/update/${editEvent.id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       // Refetch the gallery data after update
//       const responseGallery = await axios.get('http://localhost:8000/gallery/getdata');
//       const mappedGallery = responseGallery.data.map((item) => ({
//         id: item._id,
//         image: item.filename,
//         createdAt: item.created_at,
//         updatedAt: item.updated_at,
//       }));
//       setEvents(mappedGallery);
//       setEditEvent(null); // Reset edit mode
//       setFile(null); // Reset file input after save
//     } catch (error) {
//       setError('Error saving edit');
//       console.error('Error saving edit:', error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Gallery</h2>

//       {error && <div className="text-red-500 mb-4">{error}</div>}

//       {/* File Upload Section */}
//       <div className="mb-4">
//         <input
//           type="file"
//           onChange={handleFileChange}
//           className="border rounded-md px-3 py-2"
//         />
//         <button
//           onClick={handleFileUpload}
//           className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md ml-2"
//         >
//           Upload Image
//         </button>
//       </div>

//       {/* Edit Form */}
//       {editEvent && (
//         <div className="mb-4">
//           <h3>Edit Event</h3>
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="border rounded-md px-3 py-2 mb-2"
//           />
//           <button
//             onClick={handleSaveEdit}
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//           >
//             Save Changes
//           </button>
//           <button
//             onClick={() => setEditEvent(null)} // Cancel edit
//             className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md ml-2"
//           >
//             Cancel
//           </button>
//         </div>
//       )}

//       {/* Render Gallery */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
//               <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
//               <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
//               <th className="border-b px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {events.map((event) => (
//               <tr key={event.id}>
//                 <td className="px-6 py-4">
//                   <img src={event.image} alt="Event" className="h-16 w-16 object-cover rounded" />
//                 </td>
//                 <td className="px-6 py-4">{event.createdAt}</td>
//                 <td className="px-6 py-4">{event.updatedAt}</td>
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => handleEdit(event)}
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md mr-2 transition-colors"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(event)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition-colors"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Gallery;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Gallery = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null); // State to handle the selected file
  const [uploading, setUploading] = useState(false); // State to indicate upload progress

  // Fetch gallery data from the API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get("http://localhost:8000/gallery/getdata");
        const mappedGallery = response.data.map((item) => ({
          id: item._id, // Assuming _id is used as the id
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

  // Handle the file change (file selected)
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null); // Clear any previous errors
  };

  // Handle file upload (for adding a new image)
  const handleFileUpload = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!file) {
      setError("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      const response = await axios.post("http://localhost:8000/gallery/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseGallery = await axios.get("http://localhost:8000/gallery/getdata");
      const mappedGallery = responseGallery.data.map((item) => ({
        id: item._id,
        image: item.filename,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
      setEvents(mappedGallery);
      setFile(null);
    } catch (error) {
      setError("Error uploading file");
      console.error("Error uploading file:", error.response ? error.response.data : error.message);
    } finally {
      setUploading(false);
    }
  };

  // Handle edit
  const handleEdit = (event) => {
    setEditEvent(event);
    setFile(null); // Reset any previous file selection
    setError(null);
  };

  // Handle save changes (after editing)
  const handleSaveEdit = async () => {
    if (!file) {
      setError("No file selected for update!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      const response = await axios.put(`http://localhost:8000/gallery/update/${editEvent.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const responseGallery = await axios.get("http://localhost:8000/gallery/getdata");
      const mappedGallery = responseGallery.data.map((item) => ({
        id: item._id,
        image: item.filename,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      }));
      setEvents(mappedGallery);
      setEditEvent(null); // Reset edit mode
      setFile(null);
    } catch (error) {
      setError("Error saving edit");
      console.error("Error saving edit:", error.response ? error.response.data : error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (event) => {
        try {
          const response = await axios.delete(`http://localhost:8000/gallery/delete/${event.id}`);
          if (response.status === 200) {
            setEvents(events.filter((e) => e.id !== event.id));
            console.log("Item deleted successfully");
          }
        } catch (error) {
          setError('Error deleting gallery item');
          console.error('Error deleting gallery item:', error.response ? error.response.data : error.message);
        }
      };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* File Upload Section */}
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border rounded-md px-3 py-2"
        />
        <button
          onClick={handleFileUpload}
          disabled={!file || uploading} // Disable button if no file or uploading
          className={`${
            uploading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          } text-white px-4 py-2 rounded-md ml-2`}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </div>

      {/* Edit Form */}
      {editEvent && (
        <div className="mb-4">
          <h3 className="font-bold mb-2">Edit Event</h3>
          <img
            src={editEvent.image}
            alt="Current"
            className="h-16 w-16 object-cover rounded mb-2"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="border rounded-md px-3 py-2 mb-2"
          />
          <button
            onClick={handleSaveEdit}
            disabled={!file || uploading}
            className={`${
              uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            } text-white px-4 py-2 rounded-md`}
          >
            {uploading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={() => setEditEvent(null)} // Cancel edit
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md ml-2"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Render Gallery */}
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
                  <img src={event.image} alt="Event" className="h-16 w-16 object-cover rounded" />
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
    </div>
  );
};

export default Gallery;

