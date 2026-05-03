import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(email && password){
      navigate("/dashboard");
    }
  }

  return (
    <div className="login-wrapper">

      <div className="login-left">
        <h1>Student Lead CRM</h1>
        <p>Manage student enquiries, follow-ups, and enrollments easily.</p>
      </div>

      <div className="login-right">

        <div className="login-box">
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button type="submit">Login</button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;