import { useState } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import TabNavigator from "./components/TabNavigator";
import AddCrypto from "./components/AddCrypto";
import DeleteCrypto from "./components/DeleteCrypto";
import Login from "./components/Login"
import OtpStuff from './components/otp';


function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false)
const [showAdd, setShowAdd] = useState(false)
const [showDelete, setShowDelete] = useState(false)
const [showOtp, setShowOtp] = useState(false)
const [role, setRole] = useState(null);

const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowOtp(false)
    setRole(localStorage.getItem('role'));
  };

  const handleGoToOtp = () => {
    setShowOtp(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAdd(false);
    setShowDelete(false);
    setShowOtp(false);
    localStorage.removeItem('token');
     localStorage.removeItem('role');
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
      onDeleteClick={() => setShowDelete(true)}
      onLogout={handleLogout}
      role={role}  />
       <>
      {showAdd && <AddCrypto onClose={() => setShowAdd(false)} />}
      {showDelete && <DeleteCrypto onClose={() => setShowDelete(false)} />}
      {!showAdd && !showDelete && <TabNavigator />}
    </>
  </BrowserRouter>
)
}

export default App
