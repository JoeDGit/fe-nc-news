import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { getArticleTopics } from '../util/api';
import { UserContext } from '../contexts/User.context';
import Button from './Button';
import { postNewArticle } from '../util/api';
import snoo from '../assets/snoo-thinking.png';
import { useNavigate } from 'react-router-dom';

export default function NewPost({ setArticles }) {
  const [topics, setTopics] = useState([]);
  const [articleTopic, setArticleTopic] = useState('');
  const [articleTitle, setArticleTitle] = useState('');
  const [articleBody, setArticleBody] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);
  const [invalidBody, setInvalidBody] = useState(false);
  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidTopic, setInvalidTopic] = useState(false);

  const navigate = useNavigate();
  const validateInputLength = (input, minLength) => {
    return input.trim().length >= minLength;
  };

  const handleInputChange = (e, stateToChange) => {
    const { value } = e.target;
    const setters = {
      title: [setArticleTitle, setInvalidTitle],
      topic: [setArticleTopic, setInvalidTopic],
      body: [setArticleBody, setInvalidBody],
    };
    const [setter, setInvalid] = setters[stateToChange];
    setInvalid(false);
    setter(value);
  };

  const { user } = useContext(UserContext);
  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    if (!validateInputLength(articleTitle, 5)) {
      setInvalidTitle(true);
      return;
    }
    if (!topics.includes(articleTopic)) {
      setInvalidTopic(true);
      return;
    }
    if (!validateInputLength(articleBody, 30)) {
      setInvalidBody(true);
      return;
    }

    if (!topics.includes(articleTopic)) {
      setInvalidTopic(true);
      return;
    }

    postNewArticle(
      articleTopic.toLowerCase(),
      articleTitle,
      user.username,
      articleBody
    )
      .then((res) => {
        setArticles((prev) => [res.article, ...prev]);

        setPostSuccess(true);

        setTimeout(() => navigate(`/articles/${res.article.article_id}`), 2000);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getArticleTopics().then(({ topics }) => {
      const alteredTopics = topics.map((topic) => {
        const topicCopy = { ...topic };
        topicCopy.slug =
          topicCopy.slug[0].toUpperCase() + topicCopy.slug.substring(1);
        return topicCopy.slug;
      });
      setTopics(alteredTopics);
    });
  }, []);
  if (postSuccess)
    return (
      <div className="text-2xl">
        Post submitted! Redirecting you to your post...
      </div>
    );
  return (
    <div className="flex justify-center  " id="form-and-sidebar-container">
      <div className="flex flex-col  md:items-start ml-4 mr-4">
        <div className="text-xl mb-4">Submit new post</div>
        <form
          className="border h-full md:w-[600px] border-slate-600 p-4 rounded-lg flex flex-col form "
          onSubmit={handleNewPostSubmit}
        >
          <input
            className="input input-bordered w-full border-slate-600 mb-4"
            type="text"
            placeholder="Post Title"
            value={articleTitle}
            onChange={(e) => handleInputChange(e, 'title')}
          ></input>
          {invalidTitle && (
            <div className="text-error mb-2">
              Please enter a longer article title
            </div>
          )}
          <select
            required
            onChange={(e) => handleInputChange(e, 'topic')}
            className="select border-slate-600 select-bordered w-full  mb-4"
            defaultValue="select-default"
          >
            <option id="select-default" className="text-border-slate-600">
              Select the topic of your post
            </option>
            {topics.map((topic) => {
              return <option key={topic}>{topic}</option>;
            })}
          </select>
          {invalidTopic && (
            <div className="text-error mb-2">
              Please select a topic for your article
            </div>
          )}
          <textarea
            value={articleBody}
            onChange={(e) => handleInputChange(e, 'body')}
            placeholder="What's on your mind?..."
            className="textarea w-full h-40 textarea-bordered border-slate-600  mb-4"
          />
          {invalidBody && (
            <div className="text-error mb-2">Please enter a longer article</div>
          )}
          <Button text="Submit" />
        </form>
      </div>
      <div
        id="new-post-sidebar"
        className="rounded-lg border border-slate-600 hidden md:block mt-11 mr-4 w-[400px]"
      >
        <div className="m-auto  w-1/2 flex items-center flex-col p-4">
          <img className=" rounded-lg" alt="snoo thinking" src={snoo} />
        </div>
        <p className=" p-4 rounded-lg text-sm">
          We're excited to hear from you and share your content with our
          community. To get started, please provide a title for your article,
          select the topic your article relates to, followed by the full text of
          your submission. We encourage you to share your unique perspective and
          insights on a wide range of topics. Please note that all articles are
          subject to moderation and may be edited for clarity, formatting, and
          adherence to our community guidelines. Thank you for your contribution
          and happy posting!
        </p>
      </div>
    </div>
  );
}
