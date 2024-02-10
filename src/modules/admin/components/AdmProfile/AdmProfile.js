import React, { useEffect, useState } from "react";
import "./AdmProfile.css";
import axios from "axios";

function AdmProfile({ id }) {
  console.log(id);

  const adminProfileAPI = `http://localhost:5000/getAdmin/${id}`;
  const updateAdminAPIURL = `http://localhost:5000/updateAdmin/${id}`;

  // State to hold the fetched admin data
  const [profileData, setProfileData] = useState({
    adminUsername: "",
    adminPassword: "",
    adminEmail: "",
    adminPhoneNumber: "",
    adminSecretKey: "",
  });

  // State to hold edited profile data
  const [editedProfileData, setEditedProfileData] = useState({
    adminUsername: "",
    adminPassword: "",
    adminEmail: "",
    adminPhoneNumber: "",
    adminSecretKey: "",
  });

  // State to track edit mode
  const [editMode, setEditMode] = useState(false);

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editMode) {
      setEditedProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Function to submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(editedProfileData);
    try {
      await axios.put(updateAdminAPIURL, editedProfileData);
      console.log("Profile data updated successfully");
      window.location.reload();
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile data:", error);
    }
  };

  // Automatically fetch the admin dedtails and shows it in the admin profile
  useEffect(() => {
    const getAdminDetails = async () => {
      try {
        const response = await axios.get(adminProfileAPI);
        setProfileData(response.data); // Set actual data from response
      } catch (error) {
        console.error("Error fetching admin details:", error);
      }
    };
    getAdminDetails();
  }, [adminProfileAPI]);

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="profile-img">
            <img
              src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png"
              alt="Profile"
            />
          </div>
          <div className="text-center">
            {editMode ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="label" htmlFor="username">
                    Username
                  </label>
                  <div className="input-container">
                    <input
                      type="text"
                      id="username"
                      name="adminUsername"
                      defaultValue={editedProfileData.adminUsername}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <div className="input-container">
                    <input
                      type="password"
                      id="password"
                      name="adminPassword"
                      defaultValue={editedProfileData.adminPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <div className="input-container">
                    <input
                      type="email"
                      id="email"
                      name="adminEmail"
                      defaultValue={editedProfileData.adminEmail}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="phone">
                    Phone No
                  </label>
                  <div className="input-container">
                    <input
                      type="tel"
                      id="phone"
                      name="adminPhoneNumber"
                      defaultValue={editedProfileData.adminPhoneNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="secretKey">
                    Secret Key
                  </label>
                  <div className="input-container">
                    <input
                      type="text"
                      id="secretKey"
                      name="adminSecretKey"
                      defaultValue={editedProfileData.adminSecretKey}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="btn-container">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p>
                  <strong>Username:</strong> {profileData.adminUsername}
                </p>
                <p>
                  <strong>Email:</strong> {profileData.adminEmail}
                </p>
                <p>
                  <strong>Phone No:</strong> {profileData.adminPhoneNumber}
                </p>
                <p>
                  <strong>Secret Key:</strong> {profileData.adminSecretKey}
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdmProfile;
