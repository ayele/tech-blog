import React, { useState, useEffect } from 'react';
import Post from '../components/Post';

const HomePage = () => {
  let [postsList, setPostsList] = useState([]);

  useEffect(() => {
    //created the function inside so that it can be
    //async. Can't make the useEffect argument
    //function async (heard it on LinkedIn Learning).
    const fetchData = async () => {
      try {
        const resoponse = await fetch('/api');
        console.log('response:', resoponse);
        const posts = await resoponse.json();
        console.log('posts: ', posts);
        setPostsList(posts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <ul>
      {postsList.map(post => (
        <Post key={post._id} post={post} collapsed={true} />
      ))}
    </ul>
  );
};

export default HomePage;
