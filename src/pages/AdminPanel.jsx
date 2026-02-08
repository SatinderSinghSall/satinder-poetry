import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { FaTachometerAlt, FaBook, FaUsers } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./AdminPanel.css";

export default function AdminPanel() {
  const { user } = useContext(AuthContext);
  const [viewMode, setViewMode] = useState("dashboard");
  const [stats, setStats] = useState({ poems: 0, users: 0, recentPoems: [] });
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState([]);

  const navigate = useNavigate();

  if (!user || user.role !== "admin") {
    return <h2 className="text-center text-danger mt-5">Access Denied</h2>;
  }

  useEffect(() => {
    fetchDashboardStats();
    if (viewMode === "viewUsers") {
      fetchUsers();
    }
  }, [viewMode]);

  const fetchDashboardStats = async () => {
    try {
      const poemsRes = await axios.get(
        "https://full-stack-poetry-management-system.onrender.com/api/poems",
      );
      const usersRes = await axios.get(
        "https://full-stack-poetry-management-system.onrender.com/api/users",
      );
      const emailRes = await axios.get(
        "https://full-stack-poetry-management-system.onrender.com/subscribers-count",
      );

      setStats({
        poems: poemsRes.data.length,
        users: usersRes.data.length,
        email: emailRes.data.length,
        recentPoems: poemsRes.data.slice(-3),
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://full-stack-poetry-management-system.onrender.com/api/users",
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //! To view the subscribed users:
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetchDashboardStats();
    if (viewMode === "viewUsers") {
      fetchUsers();
    } else if (viewMode === "viewSubscribers") {
      fetchSubscribers();
    }
  }, [viewMode]);

  const fetchSubscribers = async () => {
    try {
      const response = await axios.get(
        "https://full-stack-poetry-management-system.onrender.com/subscribers-count",
      );
      setSubscribers(response.data);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2 d-md-block bg-dark text-white sidebar p-4 shadow-lg">
          <h4 className="text-center mb-4">📖 Admin Panel</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
                className={`nav-link text-white py-2 px-3 rounded ${
                  viewMode === "dashboard" ? "bg-primary" : "hover-bg-gray"
                }`}
                onClick={() => setViewMode("dashboard")}
              >
                <FaTachometerAlt className="me-2" /> Dashboard
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link text-white py-2 px-3 rounded ${
                  viewMode === "addPoem" ? "bg-primary" : "hover-bg-gray"
                }`}
                onClick={() => setViewMode("addPoem")}
              >
                <FaBook className="me-2" /> Add Poem
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link text-white py-2 px-3 rounded ${
                  viewMode === "viewUsers" ? "bg-primary" : "hover-bg-gray"
                }`}
                onClick={() => setViewMode("viewUsers")}
              >
                <FaUsers className="me-2" /> View Users
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link text-white py-2 px-3 rounded ${
                  viewMode === "viewSubscribers"
                    ? "bg-primary"
                    : "hover-bg-gray"
                }`}
                onClick={() => setViewMode("viewSubscribers")}
              >
                📩 View Subscribers
              </button>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mb-5">
          {viewMode === "dashboard" && (
            <div className="mt-4">
              <h2>Dashboard</h2>

              {/* New Stats Cards */}
              <div className="row">
                <div className="col-md-4">
                  <div className="card bg-primary text-white shadow">
                    <div className="card-body">
                      <h5>Total Poems</h5>
                      <h3>{stats.poems}</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card bg-success text-white shadow">
                    <div className="card-body">
                      <h5>Total Users</h5>
                      <h3>{stats.users}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mt-3">
                <div className="card bg-warning text-white shadow">
                  <div className="card-body">
                    <h5>Total Subscribers</h5>
                    <h3>{stats.email}</h3>
                  </div>
                </div>
              </div>

              {/* Users & Poems Overview Graph */}
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="card shadow p-3">
                    <h5 className="text-center">Users & Poems Overview</h5>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[
                          { name: "Poems", count: stats.poems },
                          { name: "Users", count: stats.users },
                          { name: "Subscribers", count: stats.email },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" barSize={50} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <h3 className="mt-4">Recently Added Poems:</h3>
              <ul className="list-group">
                {stats.recentPoems.map((poem) => (
                  <li className="list-group-item" key={poem.id}>
                    <strong>{poem.title}</strong> by {poem.author}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {viewMode === "addPoem" && (
            <div className="mt-4">
              <h2>Add a New Poem</h2>
              <PoemForm />
            </div>
          )}

          {viewMode === "viewUsers" && (
            <div className="mt-4">
              <h2>User List</h2>
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>User Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((u) => (
                      <tr key={u.id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {viewMode === "viewSubscribers" && (
            <div className="mt-4">
              <h2>Subscriber List:</h2>
              <table className="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Subscription Date</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.length > 0 ? (
                    subscribers.map((s) => (
                      <tr key={s.id}>
                        <td>{s.email}</td>
                        <td>{new Date(s.subscribedAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">
                        No subscribers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function PoemForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Authentication token is missing. Please log in again.");
        return;
      }

      console.log("Token being sent:", token); // Debugging - Check if token exists

      const response = await axios.post(
        "https://full-stack-poetry-management-system.onrender.com/api/poems",
        { title, content, author },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        },
      );

      if (response.status === 201) {
        setMessage("Poem added successfully!");

        // Send email notification
        await axios.post(
          "https://full-stack-poetry-management-system.onrender.com/api/email/send-email",
          {
            title,
            author,
            date: new Date().toISOString(),
          },
        );

        setTitle("");
        setContent("");
        setAuthor("");
      }
    } catch (error) {
      console.log(error);
      setMessage("Failed to add poem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 border rounded shadow bg-light"
    >
      {message && <div className="alert alert-info">{message}</div>}
      <div className="mb-3">
        <label>Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Author</label>
        <input
          className="form-control"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Content</label>
        <textarea
          className="form-control"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button
        className="btn btn-success w-100"
        type="submit"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Add Poem"}
      </button>
    </form>
  );
}
