import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Discounts from "./pages/Discounts";
import "./App.css";

const Index = () => (
  <div className="page-content">
    <h1>Welcome</h1>
    <p>This is the home page.</p>
  </div>
);

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
