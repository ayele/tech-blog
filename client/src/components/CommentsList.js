import React from 'react';
import moment from 'moment';

const CommentsList = ({ comments }) => {
  return (
    <>
      <h3>Comments:</h3>
      {comments &&
        comments.map((comment, key) => (
          <div className='comment' key={key}>
            <p className='comment-name'>{comment.name}</p>
            <p className='comment-date'>
              {moment(comment.commentDate).format('MM-DD-YYYY')}
            </p>
            <p className='comment-body'>{comment.comment}</p>
            <br />
          </div>
        ))}
    </>
  );
};

export default CommentsList;
