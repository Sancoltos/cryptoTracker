import { useState } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import TabNavigator from "./components/TabNavigator";
import AddCrypto from "./components/AddCrypto";
import DeleteCrypto from "./components/DeleteCrypto";



function App() {
const [showAdd, setShowAdd] = useState(false)
const [showDelete, setShowDelete] = useState(false)

  return (
  <BrowserRouter>
      <Header onAddClick={() => setShowAdd(true)} 
      onDeleteClick={() => setShowDelete(true)} />
       <>
      {showAdd && <AddCrypto onClose={() => setShowAdd(false)} />}
      {showDelete && <DeleteCrypto onClose={() => setShowDelete(false)} />}
      {!showAdd && !showDelete && <TabNavigator />}
    </>
  </BrowserRouter>
)
}

export default App
