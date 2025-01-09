import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      {/* Mobile Hamburger Button */}
      <button
        className="lg:hidden text-white p-4"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } lg:block w-64 bg-gray-800 text-white h-full p-4 transition-all`}
      >
        <h2 className="text-center text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          {/* Dashboard Link */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${
                isActive ? "bg-green-500 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>

          {/* Event Section with Toggleable Dropdown */}
          <div>
            <button
              className="w-full py-2 px-4 rounded bg-gray-700 text-white flex justify-between items-center"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              Events
              <span className="ml-2">{isDropdownOpen ? "▲" : "▼"}</span>
            </button>

            {/* Dropdown Menu for Events */}
            {isDropdownOpen && (
              <div className="mt-2 bg-gray-700 flex flex-col rounded p-2">
                <NavLink
                  to="/events/wedding"
                  className={({ isActive }) =>
                    `w-full text-left py-2 px-4 rounded ${
                      isActive ? "bg-green-500 text-white" : "hover:bg-gray-600"
                    }`
                  }
                >
                  Wedding
                </NavLink>
                <NavLink
                  to="/events/birthday"
                  className={({ isActive }) =>
                    `w-full text-left py-2 px-4 rounded ${
                      isActive ? "bg-green-500 text-white" : "hover:bg-gray-600"
                    }`
                  }
                >
                  Birthday
                </NavLink>
                <NavLink
                  to="/events/anniversary"
                  className={({ isActive }) =>
                    `w-full text-left py-2 px-4 rounded ${
                      isActive ? "bg-green-500 text-white" : "hover:bg-gray-600"
                    }`
                  }
                >
                  Anniversary
                </NavLink>
                <NavLink
                  to="/events/kittyparty"
                  className={({ isActive }) =>
                    `w-full text-left py-2 px-4 rounded ${
                      isActive ? "bg-green-500 text-white" : "hover:bg-gray-600"
                    }`
                  }
                >
                  Kitty Party
                </NavLink>
                <NavLink
                  to="/events/BabyShower"
                  className={({ isActive }) =>
                    `w-full text-left py-2 px-4 rounded ${
                      isActive ? "bg-green-500 text-white" : "hover:bg-gray-600"
                    }`
                  }
                >
                  Baby Shower
                </NavLink>
                <NavLink
                  to="/events/RetirementParty"
                  className={({ isActive }) =>
                    `w-full text-left py-2 px-4 rounded ${
                      isActive ? "bg-green-500 text-white" : "hover:bg-gray-600"
                    }`
                  }
                >
                  Retirement Party
                </NavLink>
                <NavLink
                  to="/events/ThemeParty"
                  className={({ isActive }) =>
                    `w-full text-left py-2 px-4 rounded ${
                      isActive ? "bg-green-500 text-white" : "hover:bg-gray-600"
                    }`
                  }
                >
                  Theme Party
                </NavLink>
                <NavLink
                  to="/events/ReunionParty"
                  className={({ isActive }) =>
                    `w-full text-left py-2 px-4 rounded ${
                      isActive ? "bg-green-500 text-white" : "hover:bg-gray-600"
                    }`
                  }
                >
                  Reunion Party
                </NavLink>
                <NavLink
                  to="/events/AlumuniParty"
                  className={({ isActive }) =>
                    `w-full text-left py-2 px-4 rounded ${
                      isActive ? "bg-green-500 text-white" : "hover:bg-gray-600"
                    }`
                  }
                >
                  Alumuni Party
                </NavLink>
                <NavLink
                  to="/events/Corporate"
                  className={({ isActive }) =>
                    `w-full text-left py-2 px-4 rounded ${
                      isActive ? "bg-green-500 text-white" : "hover:bg-gray-600"
                    }`
                  }
                >
                  Corporate event
                </NavLink>
              </div>
            )}
          </div>

          {/* Gallery Section */}
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${
                isActive ? "bg-green-500 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            Gallery
          </NavLink>

          {/* Enquiry Section */}
          <NavLink
            to="/enquiry"
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${
                isActive ? "bg-green-500 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            Enquiry
          </NavLink>

          {/* Vlog Section */}
          <NavLink
            to="/vlog"
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${
                isActive ? "bg-green-500 text-white" : "hover:bg-gray-700"
              }`
            }
          >
            Vlog
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
