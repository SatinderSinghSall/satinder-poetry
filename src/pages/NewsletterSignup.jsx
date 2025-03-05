import { useState } from "react";
import axios from "axios";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("⚠️ Please enter a valid email!");
      return;
    }

    setLoading(true); // Show loading state

    try {
      const response = await axios.post(
        "https://full-stack-poetry-management-system.onrender.com/subscribe",
        {
          email,
        }
      );
      setMessage(`✅ ${response.data.message}`);
      setEmail(""); // Clear input field
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage(`⚠️ ${error.response.data.message}`);
      } else {
        setMessage("❌ Subscription failed. Try again.");
      }
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <section className="bg-dark text-white py-5">
      <div className="container text-center">
        <h2 className="text-light fw-bold">📩 Stay Inspired</h2>
        <p className="text-light-50">
          Subscribe for the latest poetry updates.
        </p>

        {/* Responsive Input Section */}
        <div className="row justify-content-center mt-3">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="input-group">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control border-0 px-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading} // Disable input when loading
              />
              <button
                onClick={handleSubscribe}
                className="btn btn-primary px-4"
                disabled={loading} // Disable button when loading
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        {/* Message Display with Styling */}
        {message && (
          <p
            className={`mt-3 ${
              message.includes("✅") ? "text-success" : "text-warning"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
