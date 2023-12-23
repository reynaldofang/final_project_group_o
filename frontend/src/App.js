import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import News from "./components/news/Newsgrids";
import Footer from "./components/Footer";
import Order from "./components/order/Order";
import NutritionInfo from "./components/Nutrition/NutritionInfo";
import NewsDetailPage from "./components/news/NewsDetailPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/news/:_id" element={<NewsDetailPage />} />
        <Route path="/nutrition-info" element={<NutritionInfo />} />
        <Route path="/order-food" element={<Order />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
