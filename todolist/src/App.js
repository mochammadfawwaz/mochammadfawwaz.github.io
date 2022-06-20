import { Routes, Link, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import './App.css';
import AboutTim from './AboutTim';
import Blog from './Blog';
import NotFound from './NotFound';
import BlogDetail from './BlogDetail';
import Dashboard from './Dashboard';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} >
          <Route path="tim" element={<AboutTim />} />
        </Route>
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogDetail />} />
        <Route path="*" element={<NotFound />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
