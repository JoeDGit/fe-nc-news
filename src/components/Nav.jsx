import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getArticleTopics } from '../api';

export default function Nav() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getArticleTopics().then(({ topics }) => {
      setTopics(topics);
    });
  }, []);

  return (
    <nav style={navStyle}>
      <NavLink to="/">Home</NavLink>
      {topics.map((topic) => {
        return (
          <NavLink to={`/?topic=${topic.slug}`} key={topic.slug}>
            {topic.slug}
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
