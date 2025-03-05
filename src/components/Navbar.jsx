import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow"
      style={{
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
      }}
    >
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold text-white d-flex align-items-center"
          to="/"
        >
          📜 Poetry Web
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto text-center text-lg-start">
            <li className="nav-item">
              <Link
                className="nav-link fw-semibold text-white px-3 py-2"
                to="/poems"
                style={{
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease-in-out",
                  borderRadius: "8px",
                  marginRight: "40px",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.2)";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent";
                }}
              >
                📖 Poems
              </Link>
            </li>

            {user ? (
              <>
                {user.role === "admin" && (
                  <li className="nav-item text-center text-lg-start">
                    <Link
                      className="btn btn-warning fw-semibold text-dark mb-2 mb-lg-0 me-lg-3"
                      to="/admin"
                    >
                      Admin Panel
                    </Link>
                  </li>
                )}

                {/* User Dropdown */}
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-outline-light dropdown-toggle fw-semibold"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow">
                    <li>
                      <button
                        className="dropdown-item text-danger fw-semibold"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item text-center text-lg-start">
                  <Link
                    className="btn btn-outline-light fw-semibold me-lg-2 mb-2 mb-lg-0"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item text-center text-lg-start">
                  <Link
                    className="btn btn-light fw-semibold text-dark"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
