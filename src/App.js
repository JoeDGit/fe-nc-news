import { useEffect, useState } from 'react';
import { fetchAllArticles } from './util/api';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Nav from './components/Nav';
import SingleArticlePage from './components/SingleArticlePage';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import BadPath from './components/BadPath';
import SortArticlesForm from './components/SortArticlesForm';
import Button from './components/Button';
import NewPost from './components/NewPost';

function App() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('votes');
  const [orderBy, setOrderBy] = useState('desc');
  const [badPath, setBadPath] = useState(false);

  const [badOrderQuery, setBadOrderQuery] = useState(false);
  const [badSortQuery, setBadSortQuery] = useState(false);

  const topicQuery = searchParams.get('topic');
  const sortByQuery = searchParams.get('sort_by');
  const orderByQuery = searchParams.get('order');

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort_by', e.target.value);
    setSearchParams(newParams);
  };

  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('order', e.target.value);
    setSearchParams(newParams);
  };

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
            ) : isLoading ? (
              <div>Loading ...</div>
            ) : (
              <>
                <Button display="md:hidden" text={'Add New Post'} />
                <SortArticlesForm
                  sortBy={sortBy}
                  handleSortChange={handleSortChange}
                  orderBy={orderBy}
                  handleOrderChange={handleOrderChange}
                />
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
              </>
            )
          }
        />
        <Route path="/articles/:article_id" element={<SingleArticlePage />} />
        <Route path="/submit" element={<NewPost />} />
        <Route path="/*" element={<BadPath />} />
      </Routes>
    </div>
  );
}

export default App;
