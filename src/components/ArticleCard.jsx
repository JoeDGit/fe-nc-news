import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { patchArticleVotes } from '../util/api';
import { BiUpvote, BiDownvote } from 'react-icons/bi';
import { AiOutlineComment } from 'react-icons/ai';

export default function ArticleCard({ article, setArticles }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const { article_id, title, topic, author, created_at, votes, comment_count } =
    article;
  const dateObject = new Date(created_at);
  const readableDate = dateObject.toLocaleString('en-gb');

  const handleError = () => {
    setIsError(true);
    const timer = setTimeout(() => {
      setIsError(false);
      setErrorMessage(null);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  };

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
      setErrorMessage('Something went wrong, please try again');
      handleError();
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
      setErrorMessage('Something went wrong, please try again');
      handleError();
    });
  };

  return (
    <div style={articleAndVotesStyle} id="article-and-votes-container">
      <div style={articleVotesStyle} id="article-votes">
        {isError ? <div style={errorMessageStyle}>{errorMessage}</div> : null}
        <div onClick={() => handleUpVote()} id="up-vote">
          <BiUpvote />
        </div>
        <div
          style={{
            color: '#FF4500',
          }}
          id="vote-count"
        >
          {votes}
        </div>
        <div onClick={() => handleDownVote()} id="down-vote">
          <BiDownvote />
        </div>
      </div>
      <div style={articleContainerStyle} id="article-container">
        <Link to={`/articles/${article_id}`}>
          <div id="article-title">{title}</div>
        </Link>
        <div style={articleDetailsStyle} id="post-details-container">
          <div id="article-comment-count">
            {comment_count} <AiOutlineComment />
          </div>
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
  border: '1px solid white',
  borderRadius: '15px',
  width: '50%',
  marginBottom: '1em',
  height: '8vh',
  justifyContent: 'space-around',
};
const articleVotesStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1em',
  marginRight: '1em',
  width: '3em',
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
