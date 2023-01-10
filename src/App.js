import { useEffect, useState } from 'react';
import { fetchAllArticles } from './api';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';
import SingleArticle from './components/SingleArticle';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [articles, setArticles] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchAllArticles().then((data) => {
      setArticles(data.articles);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            isloading ? (
              <div>Loading ...</div>
            ) : (
              <Home articles={articles} setArticles={setArticles} />
            )
          }
        />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </div>
  );
}

export default App;
