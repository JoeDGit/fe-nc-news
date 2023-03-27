import React from 'react';
import ArticleCard from './ArticleCard';
import Sidebar from './Sidebar';

export default function Home({
  articles,
  setArticles,
  searchParams,
  setSearchParams,
  badSortQuery,
  badOrderQuery,
  sortByQuery,
  orderByQuery,
}) {
  return (
    <div className="md:flex mx-2 md:ml-5">
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
      <Sidebar />
    </div>
  );
}
