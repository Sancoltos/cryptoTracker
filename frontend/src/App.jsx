import { useState } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import TabNavigator from "./components/TabNavigator";
import AddCrypto from "./components/AddCrypto";



function App() {
const [showAdd, setShowAdd] = useState(false)

  return (
  <BrowserRouter>
      <Header onAddClick={() => setShowAdd(true)} />
      {showAdd ? (
        <AddCrypto onClose={() => setShowAdd(false)} />
      ) : (
      <TabNavigator />

  )}
    </BrowserRouter>
  )
}

export default App
