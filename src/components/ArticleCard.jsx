import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { patchArticleVotes } from '../api';

export default function ArticleCard({ article, setArticles }) {
  const [isError, setIsError] = useState(null);
  const [errorVisibility, setErrorVisibility] = useState(false);

  const { article_id, title, topic, author, created_at, votes, comment_count } =
    article;
  const dateObject = new Date(created_at);
  const readableDate = dateObject.toLocaleString('en-gb');

  const handleUpVote = () => {
    setArticles((currentArticles) => {
      return currentArticles.map((article) => {
        if (article.article_id === article_id) {
          return { ...article, votes: article.votes + 1 };
        }
        return article;
      });
    });
    patchArticleVotes(article_id, 'up').catch((err) => {
      setArticles((currentArticles) => {
        return currentArticles.map((article) => {
          if (article.article_id === article_id) {
            return { ...article, votes: article.votes - 1 };
          }
          return article;
        });
      });
      setIsError('Something went wrong, please try again');
    });
  };

  const handleDownVote = () => {
    setArticles((currentArticles) => {
      return currentArticles.map((article) => {
        if (article.article_id === article_id) {
          return { ...article, votes: article.votes - 1 };
        }
        return article;
      });
    });
    patchArticleVotes(article_id, 'down').catch((err) => {
      setArticles((currentArticles) => {
        return currentArticles.map((article) => {
          if (article.article_id === article_id) {
            return { ...article, votes: article.votes + 1 };
          }
          return article;
        });
      });
      setIsError('Something went wrong, please try again');
    });
  };

  useEffect(() => {
    if (!isError) {
      setErrorVisibility(false);
    }

    setErrorVisibility(true);
    const timer = setTimeout(() => {
      setErrorVisibility(false);
      setIsError(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [isError]);

  return (
    <div style={articleAndVotesStyle} id="article-and-votes-container">
      <div style={articleVotesStyle} id="article-votes">
        {errorVisibility ? (
          <div style={errorMessageStyle}>{isError}</div>
        ) : null}
        <div onClick={() => handleUpVote()} id="up-vote">
          ↑
        </div>
        <div id="vote-count">{votes}</div>
        <div onClick={() => handleDownVote()} id="down-vote">
          ↓
        </div>
      </div>
      <div style={articleContainerStyle} id="article-container">
        <Link to={`/articles/${article_id}`}>
          <div id="article-title">{title}</div>
        </Link>
        <div style={articleDetailsStyle} id="post-details-container">
          <div id="article-comment-count">{comment_count} Comments</div>
          <div id="article-author">Author: {author}</div>
          <div id="article-date">Posted: {readableDate}</div>
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
  width: '50%',
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
  fontSize: '12px',
};

const articleAndVotesStyle = {
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  justifyContent: 'center',
};

const errorMessageStyle = {
  position: 'absolute',
  left: '28em',
  fontSize: '12px',
  color: 'red',
  width: '5%',
};
