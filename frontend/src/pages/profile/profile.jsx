import Header from "../../components/Header/header";
import { useApplicationsStore } from "../../store/useApplicationsStore";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import './profile.css'; // Import the CSS file for styling
const Profile = () => {
 const { user } = useApplicationsStore();
 const navigate = useNavigate();
 const handleBackButtonClick = () => {
   navigate("/dashboard"); // Navigate back to the previous page
 };
 const userLogo = user.name?.split(' ').map(word => word.charAt(0).toUpperCase()).join('') || '';
  return (
    <>
    <Header />
    <div className="profile-container">
      
      
      < div className="profile-content">
        <div className="profile-welcome-container">
          <button className="profile-back-button" onClick={handleBackButtonClick}><FaLongArrowAltLeft size={20}/></button>
          <h1 className="profile-welcome-message">Welcome, {user.name}</h1>
        </div>
        <div className="profile-info-card-container">
          
          <div className="profile-user-logo-container">
            <div className="profile-user-logo">
              <span >{userLogo}</span>
            </div>
            <div className="profile-details">
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-email">{user.email}</p>
            
            </div>
          
        </div>
          <div className="profile-info-card">
            <div className="profile-info-item">
              <h2 className="profile-info-title">UserId</h2>
              <p className="profile-info-value">{user.id}</p>
              <h2 className="profile-info-title">Email ID</h2>
              <p className="profile-info-value">{user.email}</p>
              <h2 className="profile-info-title">Phone Number</h2>
              <p className="profile-info-value">{user.phone}</p>
            </div>
            <div className="profile-info-item">
              <h2 className="profile-info-title">Name</h2>
              <p className="profile-info-value">{user.name}</p>
              <h2 className="profile-info-title">Address</h2>
              <p className="profile-info-value">{user.address}</p>
            </div>
          </div>
      </div>
    </div>
    </div>
    
    </>
  );
  
};



export default Profile;