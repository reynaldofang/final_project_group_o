// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import News from "./components/news/Newsgrids";
import OrderFood from "./components/order/Order";
import Footer from "./components/Footer";


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/news" element={<News />} />
        <Route path="/order-food" element={<OrderFood />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
