import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Pass the setSelectedEvent function to Sidebar */}
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto">
          <AppRoutes /> 
        </div>
      </div>
    </Router>
  );
};

export default App;
