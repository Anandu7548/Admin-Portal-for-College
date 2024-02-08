
import React, { useState } from 'react';
import "./login.css";
import Navbar from '../../../components/navbar/Navbar';

export default function Login() {
  const [role, setRole] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [secretKey, setSecretKey] = useState(''); 

  const handleLogin = () => {
    
    console.log("Role:", role);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Secret Key:", secretKey);
    
  };

  return (
    <div>
      <Navbar/>
    <div className="login-container">
      <h2>Login</h2>
      <div className="form-group">
        <label>Select Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {role === 'admin' && (
        <div className="form-group">
          <label>Secret Key:</label>
          <input type="password" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} />
        </div>
      )}
      <div className='form-group'>
      <button onClick={handleLogin}>Login</button>
      </div>
    </div>
    </div>
  );
}
