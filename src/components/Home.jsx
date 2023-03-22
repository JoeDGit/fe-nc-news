import React from 'react';
import ArticleCard from './ArticleCard';

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
    <div className="flex mx-2 md:ml-5">
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
      <section id="side-bar" className="w-[20vw] border-[1px]">
        test
      </section>
    </div>
  );
}
