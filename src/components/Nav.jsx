import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { getArticleTopics } from '../util/api';

export default function Nav() {
  const [topics, setTopics] = useState([]);
  const { search } = useLocation();
  const topicParam = new URLSearchParams(search).get('topic');

  useEffect(() => {
    getArticleTopics().then(({ topics }) => {
      const alteredTopics = topics.map((topic) => {
        const topicCopy = { ...topic };
        topicCopy.slug =
          topicCopy.slug[0].toUpperCase() + topicCopy.slug.substring(1);
        return topicCopy;
      });
      setTopics(alteredTopics);
    });
  }, []);

  function isHomeActive() {
    if (topicParam) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <nav className="flex md:justify-start mb-6 md:mt-2 md:ml-4 tabs md:[&>*]:text-lg [&>*]:text-white">
      <NavLink
        className={
          isHomeActive() ? 'tab tab-bordered tab-active' : 'tab tab-bordered'
        }
        exact
        to="/"
      >
        <span className="text-primary">H</span>ome
      </NavLink>
      {topics.map((topic) => {
        return (
          <NavLink
            className={
              topicParam === topic.slug.toLowerCase()
                ? 'tab tab-bordered tab-active'
                : 'tab tab-bordered'
            }
            to={`/?topic=${topic.slug.toLowerCase()}`}
            key={topic.slug}
          >
            <span className="text-primary">{topic.slug[0]}</span>
            {topic.slug.substring(1)}
          </NavLink>
        );
      })}
    </nav>
  );
}
