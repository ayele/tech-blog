import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import CommentsList from '../components/CommentsList';
import AddCommentForm from '../components/AddCommentForm';
import Post from '../components/Post';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    console.log('useEffect function called after component render');
    const fetchData = async () => {
      try {
        const resoponse = await fetch(`/api/posts/show/${id}`);
        console.log('PostPage: fetch response:', resoponse);
        const post = await resoponse.json();
        console.log('PostPage: post: ', post);
        setPost(post);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Post post={post} collapsed={false} />
      <CommentsList comments={post.comments} />
      <AddCommentForm
        postId={post._id}
        setPost={setPost}
        errors={errors}
        setErrors={setErrors}
      />
    </>
  );
};

export default PostPage;
