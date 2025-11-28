import { useState } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import TabNavigator from "./components/TabNavigator";
import AddCrypto from "./components/AddCrypto";
import DeleteCrypto from "./components/DeleteCrypto";
import Login from "./components/Login"



function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false)
const [showAdd, setShowAdd] = useState(false)
const [showDelete, setShowDelete] = useState(false)

const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowAdd(false);
    setShowDelete(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }



  return (
  <BrowserRouter>
      <Header onAddClick={() => setShowAdd(true)} 
      onDeleteClick={() => setShowDelete(true)}
      onLogout={handleLogout} />
       <>
      {showAdd && <AddCrypto onClose={() => setShowAdd(false)} />}
      {showDelete && <DeleteCrypto onClose={() => setShowDelete(false)} />}
      {!showAdd && !showDelete && <TabNavigator />}
    </>
  </BrowserRouter>
)
}

export default App
