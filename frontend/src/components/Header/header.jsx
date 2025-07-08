import { useApplicationsStore } from "../../store/useApplicationsStore";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
import './header.css'; // Import the CSS file for styling
const Header = () => {
  const { fetchUser, user } = useApplicationsStore();
  const navigate = useNavigate();
  const handleProfileNavigation = () => {
    navigate("/profile"); // Navigate to the profile page
  };
  useEffect(() => { 
    fetchUser();
  }, [fetchUser]);
  const userLogo = user.name?.split(' ').map(word => word.charAt(0).toUpperCase()).join('') || '';
  const swiftLogo = "https://res.cloudinary.com/dze7v0evj/image/upload/v1751953926/swift_real_logo_eylzlj.png"; // Replace with your logo URL
  return (
    <nav>
        <div className="header-container">
            <img src = {swiftLogo} alt="Swift Logo"  className="swift-logo"/>
            <div className="user-info">
                <div className="user-logo">
                  <button className="profile-button" onClick={handleProfileNavigation}>
                    {userLogo}
                  </button>
                  
                </div>
                <span className="user-name">{user.name}</span>
            </div>
        </div>
    </nav>
  );
};



export default Header;