import React from 'react'
import {useParams} from 'react-router-dom'
import Navbar from '../../../components/navbar/Navbar';
import './AdmDashboard.css';
import { Link } from 'react-router-dom';
import AdmProfile from '../../AdmProfile/AdmProfile';

function AdmDashboard() {
  const { id } = useParams()
  console.log(id);
  return (
    <div>
      <Navbar />
      <div className="sidebar">
      <ul>
        <li>
          <Link to="/">MY PROFILE</Link>
        </li>
        <li>
          <Link to="/">ADMINS</Link>
        </li>
        <li>
          <Link to="/">TEACHERS</Link>
        </li>
        <li>
          <Link to="/">STUDENTS</Link>
        </li>
       
      </ul>
    </div>
    {/* <AdmProfile id={id} /> */}
    </div>
   
  )
}

export default AdmDashboard