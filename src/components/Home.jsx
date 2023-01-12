import React from 'react';
import ArticleCard from './ArticleCard';

export default function Home({
  articles,
  setArticles,
  sortBy,
  setSortBy,
  orderBy,
  setOrderBy,
  searchParams,
  setSearchParams,
}) {
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

  return (
    <div>
      <div style={sortingContainersStyle} id="sorting-containers">
        <div id="sort-query">
          <label htmlFor="sort-by-selector">Sort articles by: </label>
          <select
            id="sort-by-selector"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="votes">Votes</option>
            <option value="comment_count">Comment count</option>
            <option value="created_at">Date posted</option>
          </select>
        </div>
        <div id="sort-order">
          <form>
            <label htmlFor="sort-order">Sort order: </label>
            <select value={orderBy} onChange={handleOrderChange}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </form>
        </div>
      </div>
      <section id="articles-container">
        {articles.map((article) => {
          return (
            <ArticleCard
              key={article.article_id}
              article={article}
              setArticles={setArticles}
            />
          );
        })}
      </section>
    </div>
  );
}

const sortingContainersStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3em',
  alignItems: 'stretch',
  marginBottom: '1em',
  marginLeft: '1em',
};
