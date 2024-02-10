import axios from "axios";
import React, { useEffect, useState } from "react";
import "./studentsList.css"; // Import CSS file

export default function StudentsList() {
  const getStudentsAPIURL = "http://localhost:5000/getStudents";
  const addStudentAPIURL = "http://localhost:5000/newStudent"; // Corrected API endpoint

  const [studentData, setStudentData] = useState([]);
  const [newStudent, setNewStudent] = useState({
    stdName: "",
    stdEmail: "",
    stdPhoneNumber: "",
    regNo:"",
    stdDept: "",
    stdPassword:""
  });

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const response = await axios.get(getStudentsAPIURL);
        setStudentData(response.data);
      } catch (error) {
        console.log("Error fetching students", error);
      }
    };
    getStudentData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(addStudentAPIURL, newStudent);
      const response = await axios.get(getStudentsAPIURL);
      setStudentData(response.data);
      setNewStudent({
        stdName: "",
        stdEmail: "",
        regNo:"",
        stdPhoneNumber: "",
        stdDept: "",
        stdPassword:""
      });
      console.log("New student added successfully");
    } catch (error) {
      console.log("Error adding new student:", error);
    }
  };

  return (
    <div>
      <div className="addStudent-form">
        <h1>Add New Student</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="stdName">Name:</label>
            <input
              type="text"
              id="stdName"
              name="stdName"
              value={newStudent.stdName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="regNo">Reg No:</label>
            <input
              type="text"
              id="regNo"
              name="regNo"
              value={newStudent.regNo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="stdEmail">Email:</label>
            <input
              type="email"
              id="stdEmail"
              name="stdEmail"
              value={newStudent.stdEmail}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="stdPassword">Password:</label>
            <input
              type="password"
              id="stdPassword"
              name="stdPassword"
              value={newStudent.stdPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="stdPhoneNumber">Phone Number:</label>
            <input
              type="text"
              id="stdPhoneNumber"
              name="stdPhoneNumber"
              value={newStudent.stdPhoneNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="stdDept">Department:</label>
            <input
              type="text"
              id="stdDept"
              name="stdDept"
              value={newStudent.stdDept}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Add Student</button>
        </form>
      </div>
      <div className="studentListContainer">

      </div>
      <div className="studentsList">
        <h1>Students List</h1>
        <div className="students-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Department</th>
                <th>Reg No</th>
                <th>Password</th>
                <th>Certificates</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr key={index}>
                  <td>{student.stdName}</td>
                  <td>{student.stdEmail}</td>
                  <td>{student.stdPhoneNumber}</td>
                  <td>{student.stdDept}</td>
                  <td>{student.regNo}</td>
                  <td>{student.stdPassword}</td>
                  <td>{student.certificates}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
