import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Post from '../components/Post';

const CategoryPage = () => {
  let { category } = useParams();
  let [postsList, setPostsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resoponse = await fetch(`/api/categories/show/${category}`);
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

export default CategoryPage;
