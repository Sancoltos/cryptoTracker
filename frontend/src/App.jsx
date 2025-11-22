import { BrowserRouter, Routes, Route} from "react-router-dom";
// import { useState } from 'react'
import Header from "./components/Header";
import TabNavigator from "./components/TabNavigator";




function App() {


  return (
  <BrowserRouter>
      <Header />
      <TabNavigator />


    </BrowserRouter>
  )
}

export default App
