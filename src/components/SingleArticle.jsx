import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/User.context';
import { deleteArticle, patchArticleBody } from '../util/api';

export default function SingleArticle({
  articleTopic,
  articleAuthor,
  articleTitle,
  articleBody,
  readableDate,
  article_id,
  setArticles,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [failedDelete, setFailedDelete] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [updatedArticleBody, setUpdatedArticleBody] = useState(articleBody);
  const [divWidth, setDivWidth] = useState(0);
  const [divHeight, setDivHeight] = useState(0);
  const divRef = useRef(null);

  useEffect(() => {
    const { clientWidth, clientHeight } = divRef.current;
    setDivWidth(clientWidth);
    setDivHeight(clientHeight);
  }, []);

  const navigate = useNavigate();

  const { user } = useContext(UserContext);
  const isAuthor = user.username === articleAuthor;

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleCancelEdit = () => {
    setIsEditable(false);
    setUpdatedArticleBody(articleBody);
  };

  const handleSaveEdit = () => {
    setIsEditable(false);
    if (articleBody === updatedArticleBody) return;
    patchArticleBody(article_id, updatedArticleBody);
  };

  const handleDelete = () => {
    deleteArticle(article_id)
      .then(() => {
        setDeleteSuccess(true);
        setArticles((prev) =>
          prev.filter((article) => article.article_id !== Number(article_id))
        );
        setTimeout(() => navigate(`/`), 2000);
      })
      .catch((err) => {
        deleteFailStateReset();
        console.log(err);
      });
  };

  const deleteFailStateReset = () => {
    setFailedDelete(true);
    const timer = setTimeout(() => {
      setFailedDelete(false);
      setConfirmDelete(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  };

  if (deleteSuccess)
    return (
      <div className="text-2xl">
        Post deleted! Redirecting you to the homepage...
      </div>
    );
  return (
    <article
      className="flex flex-col items-start  border border-slate-600 p-4"
      id="article-container"
    >
      <h2
        className="text-xl underline underline-offset-8 mb-4 decoraton-primary"
        id="article-title"
      >
        {articleTitle}
      </h2>
      <div
        className="md:flex  mb-2 text-xs w-full md:text-left"
        id="post-details"
      >
        <div>
          Posted In {articleTopic} by{' '}
          <span className="text-primary">{articleAuthor}</span> {readableDate}
        </div>
        <div className="mt-2 md:mt-0">
          {failedDelete && (
            <div className="text-error ml-4">
              Something Went wrong, please try again
            </div>
          )}
          {!confirmDelete && isAuthor && (
            <button
              onClick={() => setConfirmDelete(true)}
              className="ml-2 bg-primary px-2 py-[0px] rounded-md text-xs"
            >
              Delete
            </button>
          )}
          {confirmDelete && !failedDelete ? (
            <div className=" ml-4 ">
              Are you sure?{' '}
              <button
                className="bg-warning px-2 py-[0px] rounded-md text-xs"
                onClick={handleDelete}
              >
                Yes
              </button>{' '}
              /{' '}
              <button
                className="bg-warning px-2 py-[0px] rounded-md text-xs"
                onClick={() => setConfirmDelete(false)}
              >
                No
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {!isEditable ? (
        <div
          ref={divRef}
          className={`md:text-left p-4 border rounded ${
            isEditable ? 'border-primary' : 'border-slate-600'
          }`}
          id="article-body"
        >
          {updatedArticleBody}
        </div>
      ) : (
        <textarea
          className={` textarea md:text-left p-4 border rounded ${
            isEditable ? 'border-primary' : 'border-slate-600'
          }`}
          id="article-body"
          style={{ width: divWidth, height: divHeight }}
          value={updatedArticleBody}
          onChange={(e) => setUpdatedArticleBody(e.target.value)}
        ></textarea>
      )}

      {isAuthor &&
        (!isEditable ? (
          <button
            className="mt-2 self-end bg-primary px-2 py-[0px] rounded-md text-xs"
            onClick={handleEditClick}
          >
            edit
          </button>
        ) : (
          <div className="self-end">
            <button
              onClick={handleSaveEdit}
              className="mt-2 mr-2 self-end bg-primary px-2 py-[0px] rounded-md text-xs"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="mt-2 self-end bg-primary px-2 py-[0px] rounded-md text-xs"
            >
              Cancel
            </button>
          </div>
        ))}
    </article>
  );
}
