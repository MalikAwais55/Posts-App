import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <section className="welcome-section">
        <h1>Post App</h1>
        <p>Hi Good To See You Here</p>
        <br />
        <div>
          <button style={{ color: "#ffff", backgroundColor: "#be3144", padding: "10px 30px", border: "none", borderRadius: "20px", display: "inline-block", cursor: "pointer" }} onClick={() => navigate('/view')}>View Your Post</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
