import { useEffect, useState } from 'react';
import { fetchAllArticles } from './api';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';
import SingleArticle from './components/SingleArticle';
import { Route, Routes, useSearchParams } from 'react-router-dom';

function App() {
  const [articles, setArticles] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('votes');
  const [orderBy, setOrderBy] = useState('desc');

  const topicQuery = searchParams.get('topic');



  useEffect(() => {
    setIsLoading(true);
    fetchAllArticles(topicQuery, sortBy, orderBy)
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [topicQuery, sortBy, orderBy]);

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
              <Home
                articles={articles}
                setArticles={setArticles}
                sortBy={sortBy}
                setSortBy={setSortBy}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )
          }
        />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </div>
  );
}

export default App;
