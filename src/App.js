import React from 'react'
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes,Route,BrowserRouter } from 'react-router-dom';
import Detail from "./components/Detail/Detail";
import Home from "./components/Home/Home";
import Items from "./components/Items/Items";
import Custom from './components/Custom/Custom';
import FoodDetail from "./components/FoodDetail/FoodDetail";

const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Home />
        <Routes >
            <Route path="/" element={<Items />}/>
            <Route path="/search/:id" element={<Custom/>}/>
            <Route path="/meal/category/:id" element={<Detail/>}/>
            <Route path="meal/detail/:id" element ={<FoodDetail />} />
        </Routes>
        <Sidebar />
      </BrowserRouter>
    </div>
  )
}

export default App