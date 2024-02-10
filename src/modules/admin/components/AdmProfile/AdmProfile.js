import React, { useEffect, useState } from "react";
import "./AdmProfile.css";
import axios from "axios";

function AdmProfile({ id }) {
  console.log(id);

  const adminProfileAPI = `http://localhost:5000/getAdmin/${id}`;

  // State to hold profile data
  const [profileData, setProfileData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    secretKey: "",
  });

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(adminProfileAPI, profileData);
      console.log("Profile data updated successfully");
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  useEffect(() => {
    const getAdminDetails = async () => {
      try {
        const response = await axios.get(adminProfileAPI);
        setProfileData(response.data); // Set actual data from response
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };
    getAdminDetails(); // Call the function to fetch admin details
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <div>
      <div className="card">
  <div className="card-body">
    <div className="profile-img">
      <img src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png" alt="Profile" />
    </div>
    <div className="text-center">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="username">Username</label>
          <div className="input-container">
            <input
              type="text"
              id="username"
              name="username"
              value={profileData.adminUsername}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="label" htmlFor="password">Password</label>
          <div className="input-container">
            <input
              type="password"
              id="password"
              name="password"
              value={profileData.adminPassword}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="label" htmlFor="email">Email</label>
          <div className="input-container">
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.adminEmail}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="label" htmlFor="phone">Phone No</label>
          <div className="input-container">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profileData.adminPhoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="label" htmlFor="secretKey">Secret Key</label>
          <div className="input-container">
            <input
              type="text"
              id="secretKey"
              name="secretKey"
              value={profileData.adminSecretKey}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="btn-container">
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</div>

    </div>
  );
}

export default AdmProfile;
