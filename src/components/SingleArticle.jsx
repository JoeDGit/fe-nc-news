import React from 'react';

export default function SingleArticle({
  articleTopic,
  articleAuthor,
  articleTitle,
  articleBody,
  readableDate,
}) {
  return (
    <article
      className="flex flex-col rounded items-start  border border-slate-600 p-4"
      id="article-container"
    >
      <h2
        className="text-xl underline underline-offset-8 mb-4 decoraton-primary"
        id="article-title"
      >
        {articleTitle}
      </h2>
      <div className="mb-2 text-xs w-full md:text-left" id="post-details">
        Posted In {articleTopic} by{' '}
        <span className="text-primary">{articleAuthor}</span> {readableDate}
      </div>
      <div
        className="md:text-left p-4 border border-slate-600 rounded"
        id="article-body"
      >
        {articleBody}
      </div>
    </article>
  );
}
