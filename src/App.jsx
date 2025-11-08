import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Correzione: Aggiunta esplicitamente l'estensione .js
import { AppRoutes } from './routes.js'; 
// Correzione: Aggiunta esplicitamente l'estensione .jsx
import Navbar from './components/Navbar/Navbar.jsx'; 
// Correzione: Aggiunta esplicitamente l'estensione .jsx
import Footer from './components/Footer/Footer.jsx'; 
// Correzione: Il percorso SCSS è relativo alla posizione di App.jsx
// import './App.scss'; // Importa gli stili globali (SCSS)

const App = () => {
  return (
    // Struttura di layout base: Sfondo scuro e flexbox per il footer in fondo
    <div>
      <Navbar /> 

      <main>
        <Routes>
          {AppRoutes.map(route => {
            const Component = route.element;
            return (
              <Route 
                key={route.key}
                path={route.path}
                element={<Component />} 
              />
            );
          })}
        </Routes>
      </main>

      <Footer />

    </div>
  );
};

export default App;
