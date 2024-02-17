import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './TeacherDashboard.css';
import Navbar from '../../components/navbar/Navbar';
import TeacherProfile from './components/TeacherProfile/TeacherProfile';
import Students from './components/Students/Students';

function TeacherDashboard() {
  const { id } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);

  // Render the page contents bassed on the switch case
  const renderContent = () => {
    switch (selectedOption) {
      case 'profile':
        return <TeacherProfile id={id} />;
      case 'students':
        return <Students/> ;
      case 'teachers':
        // return <TeachersList/>;
    
      default:
        return <div>Select an option to view content</div>;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="teacherDashboard">
        <div className="sidebar">
          <ul>
            <li>
              <button onClick={() => setSelectedOption('profile')}>MY PROFILE</button>
            </li>
            <li>
              <button onClick={() => setSelectedOption('students')}>STUDENTS</button>
            </li>
            <li>
              <button onClick={() => setSelectedOption('options')}>OPTIONS</button>
            </li>

           
          </ul>
        </div>
        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
