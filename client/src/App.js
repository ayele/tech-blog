import './App.css';
import logo from './nodebloglogo.png';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPostPage from './pages/AddPostPage';
import AddCategoryPage from './pages/AddCategoryPage';
import CategoryPage from './pages/CategoryPage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <div className='container'>
      <img className='logo' src={logo} alt='nodeblog logo' />
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/posts/add' element={<AddPostPage />} />
        <Route path='/categories/add' element={<AddCategoryPage />} />
        <Route path='/posts/show/:id' element={<PostPage />} />
        <Route path='/categories/show/:category' element={<CategoryPage />} />
      </Routes>
      <footer>
        <p>TechBlog &copy; 2022</p>
      </footer>
    </div>
  );
}

export default App;
