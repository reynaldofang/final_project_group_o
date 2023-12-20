// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import News from "./components/news/Newsgrids";
import Footer from "./components/Footer";
import Order from "./components/order/Order";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/news" element={<News />} />
        <Route path="/order-food" element={<Order />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
