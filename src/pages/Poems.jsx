import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Poems() {
  const [poems, setPoems] = useState([]);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const { data } = await axios.get(
          "https://full-stack-poetry-management-system.onrender.com/api/poems"
        );
        setPoems(data);
      } catch (error) {
        console.error("Error fetching poems:", error);
      }
    };

    fetchPoems();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.header}>📜 Timeless Poetry Collection</h1>
        <div style={styles.gridContainer}>
          {poems.length === 0 ? (
            <p className="text-center text-muted" style={styles.noPoems}>
              No poems available
            </p>
          ) : (
            poems.map((poem) => (
              <div key={poem._id} style={styles.card}>
                <h5 style={styles.poemTitle}>{poem.title}</h5>
                <p style={styles.author}>By {poem.author}</p>
                <Link to={`/poems/${poem._id}`} style={styles.readMore}>
                  Read More →
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Garamond', serif",
    backgroundColor: "#f5efe6",
    color: "#3d2c2e",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
  container: {
    width: "100%",
    maxWidth: "1200px",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f8f1e7",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    border: "1px solid #d1bfa7",
  },
  header: {
    fontSize: "clamp(1.8rem, 5vw, 2.8rem)", // Adjusts between small and large screens
    fontWeight: "bold",
    color: "#4a3f35",
    borderBottom: "2px solid #a38f85",
    paddingBottom: "8px",
    marginBottom: "20px",
    lineHeight: "1.3",
    wordWrap: "break-word",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // Dynamic columns
    gap: "20px",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fcf8f2",
    border: "1px solid #d1bfa7",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "center",
    transition: "0.3s",
  },
  poemTitle: {
    fontSize: "1.4rem",
    fontWeight: "bold",
    color: "#4a3f35",
  },
  author: {
    fontStyle: "italic",
    color: "#6b5e52",
  },
  readMore: {
    display: "inline-block",
    marginTop: "10px",
    color: "#8c6f60",
    fontWeight: "bold",
    textDecoration: "none",
    border: "1px solid #8c6f60",
    padding: "8px 15px",
    borderRadius: "5px",
    transition: "0.3s",
  },
  noPoems: {
    fontSize: "1.2rem",
    fontStyle: "italic",
    color: "#7d6d5b",
  },
};
