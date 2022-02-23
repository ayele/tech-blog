import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/posts/add'>Add Post</Link></li>
        <li><Link to='/categories/add'>Add Category</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
