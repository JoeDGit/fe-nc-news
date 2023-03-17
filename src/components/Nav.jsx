import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getArticleTopics } from '../util/api';

export default function Nav() {
  const [topics, setTopics] = useState([]);
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

  return (
    <nav style={navStyle}>
      <NavLink to="/">
        {' '}
        <span style={{ color: '#FF4500' }}>H</span>ome
      </NavLink>
      {topics.map((topic) => {
        return (
          <NavLink to={`/?topic=${topic.slug}`} key={topic.slug}>
            <span style={{ color: '#FF4500' }}>{topic.slug[0]}</span>
            {topic.slug.substring(1)}
          </NavLink>
        );
      })}
    </nav>
  );
}

const navStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  textDecoration: 'none',
  marginBottom: '2em',
};
