import { useState } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import FormularioPage from './pages/Form';
import ResultadosPage from './pages/Results';
import Footer from './components/Footer';
import { configurado } from './lib/supabase.js';
import styles from './App.module.css';

function App() {
  const [page, setPage] = useState('home');

  if (!configurado) {
    return (
      <main className={styles.aviso}>
        <h1>Faltam as chaves do Supabase</h1>
        <p>
          Crie o arquivo .env com VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY
          e reinicie o npm run dev. No Netlify, cadastre as duas em Environment variables.
        </p>
      </main>
    );
  }

  return (
    <>
      <main className="container">
        <section className="content">
          
          <Navbar 
            page={page}
            irParaInicio={() => setPage('home')}
            irParaFormulario={() => setPage('form')}
            irParaResultados={() => setPage('results')}
          />

          {page === 'home' && (
            <Home irParaFormulario={() => setPage('form')} />
          )}

          {page === 'form' && (
            <FormularioPage irParaResultados={() => setPage('results')} />
          )}

          {page === 'results' && (
            <ResultadosPage />
          )}

          <Footer />

        </section>
      </main>
    </>
  );
}

export default App;