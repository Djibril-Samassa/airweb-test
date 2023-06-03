import React from "react";
import Header from "./Composants/Header";
import Accueil from "./Pages/Accueil";
import Panier from "./Pages/Panier";
import "./App.css";
import { Route, Routes, BrowserRouter, Router } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/panier" element={<Panier />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
