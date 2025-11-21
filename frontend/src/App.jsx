import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Header from "./components/Header";

function App() {


  return (
  <BrowserRouter>
      <Header />
      <Routes>
        <Route/>
        <Route/>
      </Routes>


    </BrowserRouter>
  )
}

export default App
