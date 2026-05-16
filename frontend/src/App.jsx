import { useState } from "react";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const url = isLogin
        ? "https://fullstack-login-check-sample.onrender.com"
        : "https://fullstack-login-check-sample.onrender.com";

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;

      const res = await axios.post(url, payload);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isLogin ? "Login" : "Register"}</h2>

        {!isLogin && (
          <input
            style={styles.input}
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
        )}
        <input
          style={styles.input}
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          style={styles.input}
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button style={styles.button} onClick={handleSubmit}>
          {isLogin ? "Login" : "Register"}
        </button>

        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.toggle}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            style={styles.link}
            onClick={() => { setIsLogin(!isLogin); setMessage(""); }}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" },
  card: { background: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", width: "350px" },
  title: { textAlign: "center", marginBottom: "24px", color: "#333" },
  input: { width: "100%", padding: "12px", margin: "8px 0", borderRadius: "8px", border: "1px solid #ddd", fontSize: "14px", boxSizing: "border-box" },
  button: { width: "100%", padding: "12px", background: "#4f46e5", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer", marginTop: "12px" },
  message: { textAlign: "center", marginTop: "12px", color: "green" },
  toggle: { textAlign: "center", marginTop: "16px", color: "#666" },
  link: { color: "#4f46e5", cursor: "pointer", fontWeight: "bold" }
};

export default App;
