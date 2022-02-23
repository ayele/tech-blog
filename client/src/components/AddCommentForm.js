import React, { useState } from 'react';

const AddCommentForm = ({ postId, setPost, errors, setErrors }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');

  const addComment = async () => {
    const response = await fetch(`/api/posts/addcomment`, {
      method: 'post',
      body: JSON.stringify({
        name: name,
        email: email,
        comment: comment,
        id: postId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const body = await response.json();
    console.log('addComment: The json response body ', body);

    if (response.status === 400) {
      console.log(
        'addComment response status code is 400. updating errors on parent component...'
      );
      setErrors(body);
      return;
    }

    setPost(body);
    setErrors([]);
    setName('');
    setEmail('');
    setComment('');
  };

  return (
    <div>
      <h3>Add Comment:</h3>
      <br/>
      <ul className='errors'>
        {errors.map((error, key) => (
          <li className='alert alert-danger' key={key}>
            {error.msg}
          </li>
        ))}
      </ul>
      <div className='form-group'>
        <label>Name:</label>
        <input
          type='text'
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>

      <div className='form-group'>
        <label>Email:</label>
        <input
          type='text'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>

      <div className='form-group'>
        <label>Body:</label>
        <textarea
          className='textarea'
          rows='4'
          cols='50'
          value={comment}
          onChange={event => setComment(event.target.value)}
        />
      </div>
      <button onClick={() => addComment()}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
