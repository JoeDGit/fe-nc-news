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
  badSortQuery,
  badOrderQuery,
  sortByQuery,
  orderByQuery,
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
    <div className="mx-2 md:ml-5">
      <div className="md:hidden ">
        <button className=" text-xs bg-[#FF4500] mb-4 py-2 px-4 rounded">
          New Post
        </button>
      </div>

      {badSortQuery ? (
        <div style={{ color: 'red', marginBottom: '1em' }}>
          Cannot sort by {sortByQuery}
        </div>
      ) : null}

      {badOrderQuery ? (
        <div style={{ color: 'red', marginBottom: '1em' }}>
          Cannot order by {orderByQuery}
        </div>
      ) : null}

      <div
        className="flex  gap-[0.3em] justify-start mb-1 text-xs items-start "
        id="sorting-containers"
      >
        <div id="sort-query">
          <label htmlFor="sort-by-selector">Sort articles by: </label>
          <select
            className="text-black [&>*]:text-black"
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
            <select
              className="text-black [&>*]:text-black"
              value={orderBy}
              onChange={handleOrderChange}
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </form>
        </div>
      </div>
      <section id="articles-container" className="md:w-[70vw] ">
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
      <section id="side-bar" className="w-[20vw]"></section>
    </div>
  );
}
