import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import News from "./components/news/Newsgrids";
import Footer from "./components/Footer";
import NutritionInfo from "./components/Nutrition/NutritionInfo";
import NewsDetailPage from "./components/news/NewsDetailPage";
import LoginForm from "./components/auth/Login";
import RegisterForm from "./components/auth/RegisterPage";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/register"];
  const shouldRenderHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldRenderHeader && <Header />}
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/news/:_id" element={<NewsDetailPage />} />
        <Route path="/nutrition-info" element={<NutritionInfo />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
