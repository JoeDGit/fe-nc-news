import { useEffect, useState } from 'react';
import { fetchAllArticles } from './api';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchAllArticles().then((data) => {
      setArticles(data.articles);
    });
  }, []);
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home articles={articles} />} />
      </Routes>
    </div>
  );
}

export default App;
