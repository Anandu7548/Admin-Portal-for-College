import React, { useEffect, useState } from 'react';
import './AdmProfile.css';
import axios from 'axios';

function AdmProfile({ id }) {

  console.log(id);
  const adminProfileAPI = "http://localhost:5000/getAdmin";

const getAdminDetails = async()=>{
  axios.post(`${adminProfileAPI}/id`).then((response)=>{
    console.log(response);
  })
}
  // State to hold profile data
  const [profileData, setProfileData] = useState({
    username: 'user',
    password: 'pass',
    email: 'email',
    phone: 'phone',
    secretKey: 'secret'
  });

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to submit the form data
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to update profile data
    console.log('Updated Profile Data:', profileData);
  };

  useEffect(()=>{
    getAdminDetails()
  })

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="profile-img">
            <img src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png" alt="Profile" />
          </div>
          <div className="text-center">
            <form onSubmit={handleSubmit}>
              <table className='table border table-hover p-5 align-items-center'>
                <tbody>
                  <tr>
                    <td>Username</td>
                    <td><input type="text" name="username" value={profileData.username} onChange={handleChange} /></td>
                  </tr>
                  <tr>
                    <td>Password</td>
                    <td><input type="password" name="password" value={profileData.password} onChange={handleChange} /></td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td><input type="email" name="email" value={profileData.email} onChange={handleChange} /></td>
                  </tr>
                  <tr>
                    <td>Phone No</td>
                    <td><input type="tel" name="phone" value={profileData.phone} onChange={handleChange} /></td>
                  </tr>
                  <tr>
                    <td>Secret Key</td>
                    <td><input type="text" name="secretKey" value={profileData.secretKey} onChange={handleChange} /></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td><button type="submit" className="btn btn-primary">Save Changes</button></td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdmProfile;
