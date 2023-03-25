import React from 'react';

export default function SingleArticle({
  articleTopic,
  articleAuthor,
  articleTitle,
  articleBody,
  readableDate,
}) {
  return (
    <article style={articleContainerStyle} id="article-container">
      <h2 id="article-title">{articleTitle}</h2>
      <div id="article-body">{articleBody}</div>
      <div style={articleDetailsStyle} id="post-details-container">
        <div id="article-topic">{articleTopic}</div>
        <div id="article-author">Author: {articleAuthor}</div>
        <div id="article-date">Posted: {readableDate}</div>
      </div>
    </article>
  );
}

const articleContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '60%',
  margin: 'auto',
  marginTop: '1em',
  border: '1px black solid',
  borderRadius: '15px',
};

const articleDetailsStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  fontSize: '14px',
  marginTop: '2em',
  marginBottom: '1em',
};
