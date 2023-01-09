import React from 'react';

export default function ArticleCard({ article }) {
  const { article_id, title, topic, author, created_at, votes, comment_count } =
    article;
  const dateObject = new Date(created_at);
  const readableDate = dateObject.toLocaleString('en-gb');
  return (
    <div style={articleAndVotesStyle} id="article-and-votes-container">
      <div style={articleVotesStyle} id="article-votes">
        <div id="up-vote">↑</div>
        <div id="vote-count">{votes}</div>
        <div id="down-vote">↓</div>
      </div>
      <div style={articleContainerStyle} id="article-container">
        <div id="article-title">{title}</div>
        <div style={articleDetailsStyle} id="post-details-container">
          <div id="article-comment-count">Comments: {comment_count}</div>
          <div id="article-author">author: {author}</div>
          <div id="article-date">{readableDate}</div>
        </div>
      </div>
    </div>
  );
}

const articleContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid black',
  borderRadius: '15px',
  width: '70%',
  marginBottom: '1em',
  height: '12vh',
  justifyContent: 'space-around',
};
const articleVotesStyle = {
  display: 'flex',
  flexDirection: 'column',

  fontSize: '20px',
  marginTop: '1em',
  marginRight: '1em',
};
const articleDetailsStyle = {
  display: 'flex',
  justifyContent: 'space-around',
};

const articleAndVotesStyle = {
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  justifyContent: 'center',
};
