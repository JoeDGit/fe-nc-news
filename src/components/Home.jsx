import React from 'react';
import ArticleCard from './ArticleCard';

export default function Home({ articles, setArticles }) {
  return (
    <div>
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
