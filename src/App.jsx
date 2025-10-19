import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Discounts from "./pages/Discounts";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Discounts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
