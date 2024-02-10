import axios from "axios";
import React, { useEffect, useState } from "react";
import "./TeachersList.css"; // Import CSS file for TeachersList component

export default function TeachersList() {
  const getTeacherAPIURL = "http://localhost:5000/getTeachers";
  const addTeacherAPIURL = "http://localhost:5000/newTeacher"; // API endpoint to add new teacher

  const [teacherData, setTeacherData] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    thrUsername: "",
    thrEmail: "",
    thrPhoneNumber: "",
    thrAadhar: "",
    thrDept: "",
    thrPassword: "",
  });
  const [filterDept, setFilterDept] = useState(""); // State for selected department filter

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const response = await axios.get(getTeacherAPIURL);
        setTeacherData(response.data);
      } catch (error) {
        console.error("Error fetching the teachers data", error);
      }
    };
    getTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(addTeacherAPIURL, newTeacher);
      // After successfully adding the teacher, fetch the updated teacher list
      const response = await axios.get(getTeacherAPIURL);
      setTeacherData(response.data);
      // Reset the form fields
      setNewTeacher({
        thrUsername: "",
        thrEmail: "",
        thrPhoneNumber: "", // Corrected field name
        thrPassword: "",
        thrDept: "",
        thrAadhar: "",
      });
      console.log(newTeacher);
      console.log("New teacher added successfully");
    } catch (error) {
      console.log("Error adding new teacher:", error);
    }
  };

  // Filter teacher data by selected department
  const filteredTeacherData = filterDept
    ? teacherData.filter((teacher) => teacher.thrDept === filterDept)
    : teacherData;

  return (
    <div>
      <div className="newTeacherCard-container">
        <h1>Add New Teacher</h1>
        <div className="newTeacher-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="thrUsername">Name:</label>
              <input
                type="text"
                id="thrUsername"
                name="thrUsername"
                value={newTeacher.thrUsername}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="thrEmail">Email:</label>
              <input
                type="email"
                id="thrEmail"
                name="thrEmail"
                value={newTeacher.thrEmail}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="thrPhoneNumber">Phone:</label>
              <input
                type="tel"
                id="thrPhoneNumber"
                name="thrPhoneNumber"
                value={newTeacher.thrPhoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="thrPassword">Password:</label>
              <input
                type="password"
                id="thrPassword"
                name="thrPassword"
                value={newTeacher.thrPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="thrDept">Department:</label>
              <input
                type="text"
                id="thrDept"
                name="thrDept"
                value={newTeacher.thrDept}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="thrAadhar">Aadhar Number:</label>
              <input
                type="text"
                id="thrAadhar"
                name="thrAadhar"
                value={newTeacher.thrAadhar}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Add Teacher</button>
          </form>
        </div>
      </div>
      <div>
        <h1>Teachers List</h1>
        <div className="filter-container">
          <label className="filter-label">Filter by Department:</label>
          <select
            className="filter-select"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="">All Departments</option>
            {/* Assuming you have a list of departments */}
            <option value="Computer">Computer</option>
            <option value="Mechanical">Mechanical</option>
            {/* Add more options for each department */}
          </select>
        </div>

        <table className="teacher-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Aadhar Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeacherData.map((teacher, index) => (
              <tr key={index}>
                <td>{teacher.thrUsername}</td>
                <td>{teacher.thrEmail}</td>
                <td>{teacher.thrPhoneNumber}</td>
                <td>{teacher.thrDept}</td>
                <td>{teacher.thrAadhar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
