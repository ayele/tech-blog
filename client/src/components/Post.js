import { Link } from 'react-router-dom';
import moment from 'moment';

const Post = ({ post, collapsed }) => {
  const collapsedHeader = (
    <h1>
      <Link to={`/posts/show/${post._id}`}>{post.title}</Link>
    </h1>
  );
  const header = <h1>{post.title}</h1>;
  const readMore = (
    <Link className='more' to={`/posts/show/${post._id}`}>
      Read More
    </Link>
  );
  const collapsedBody = (
    <p>
      {post.body && post.body.substring(0, 400)}
      {post.body && post.body.length > 400 && '...'}
    </p>
  );
  const longBody = <p>{post.body}</p>;

  return (
    <div className='post'>
      {collapsed ? collapsedHeader : header}

      <p className='meta'>
        Posted in{' '}
        <Link to={`/categories/show/${post.category}`}>{post.category}</Link> by{' '}
        {post.author} on {moment(post.date).format('MMMM Do YYYY')}
      </p>

      {post.mainimage != 'noimage.jpg' && (
        <img src={`/images/${post.mainimage}`} alt='blog image' />
      )}

      {collapsed ? collapsedBody : longBody}

      {collapsed && readMore}
    </div>
  );
};

export default Post;
