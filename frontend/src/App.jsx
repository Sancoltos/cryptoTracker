import { useState} from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import TabNavigator from "./components/TabNavigator";
import AddCrypto from "./components/AddCrypto";
import Login from "./components/Login"
import OtpStuff from './components/otp';





function App() {
const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

const [showAdd, setShowAdd] = useState(false)
const [showOtp, setShowOtp] = useState(false)
const [searchTerm, setSearchTerm] = useState('');

const [role, setRole] = useState(() => {
    return localStorage.getItem("role");
  });

const [userEmail, setUserEmail] = useState(() => {
    // Decode JWT to get email
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.email || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });



const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowOtp(false)
    setRole(localStorage.getItem('role'));
    // Decode JWT to get email
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserEmail(payload.email || null);
      } catch (e) {
        setUserEmail(null);
      }
    }
  };

  const handleGoToOtp = () => {
    setShowOtp(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAdd(false);
    setShowOtp(false);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUserEmail(null);
  };

  if (!isAuthenticated) {
    if(showOtp) {
      return <OtpStuff onLoginGood={handleLoginSuccess} />;
    }
    return <Login onGoToOtp={handleGoToOtp} />;
  }



  return (
  <BrowserRouter>
      <Header onAddClick={() => setShowAdd(true)} 
      onLogout={handleLogout}
      role={role} 
        onSearch={setSearchTerm}
 />
       <>
      {showAdd && <AddCrypto onClose={() => setShowAdd(false)} />}
      {!showAdd && <TabNavigator searchTerm={searchTerm} userEmail={userEmail} userRole={role} />}
    </>
  </BrowserRouter>
)
}

export default App
