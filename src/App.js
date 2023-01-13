import { useEffect, useState } from 'react';
import { fetchAllArticles } from './api';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';
import SingleArticle from './components/SingleArticle';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import BadPath from './components/BadPath';

function App() {
  const [articles, setArticles] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('votes');
  const [orderBy, setOrderBy] = useState('desc');
  const [badPath, setBadPath] = useState(false);

  const [badOrderQuery, setBadOrderQuery] = useState(false);
  const [badSortQuery, setBadSortQuery] = useState(false);

  const topicQuery = searchParams.get('topic');
  const sortByQuery = searchParams.get('sort_by');
  const orderByQuery = searchParams.get('order');

  useEffect(() => {
    setBadSortQuery(false);
    setBadOrderQuery(false);

    setBadPath(false);
    setIsLoading(true);
    fetchAllArticles(topicQuery, sortBy, orderBy)
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setBadPath(true);
      });

    const validOrderQueries = ['asc', 'desc', null];
    const validSortQueries = ['comment_count', 'created_at', 'votes', null];

    if (!validSortQueries.includes(sortByQuery)) {
      setBadSortQuery(true);
    }

    if (!validOrderQueries.includes(orderByQuery)) {
      setBadOrderQuery(true);
    }
  }, [topicQuery, sortBy, orderBy, orderByQuery, sortByQuery]);

  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            badPath ? (
              <BadPath />
            ) : isloading ? (
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
                badSortQuery={badSortQuery}
                badOrderQuery={badOrderQuery}
                sortByQuery={sortByQuery}
                orderByQuery={orderByQuery}
              />
            )
          }
        />
        <Route
          path="/articles/:article_id"
          element={badPath ? <BadPath /> : <SingleArticle />}
        />
        <Route path="/*" element={<BadPath />} />
      </Routes>
    </div>
  );
}

export default App;
