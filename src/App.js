import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/ListaDePosts';
import PostDetail from './components/DetallesDePost';
import PostForm from './components/FormularioDePost';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/posts/new" element={<PostForm />} />
                <Route path="/posts/edit/:id" element={<PostForm />} />
                <Route path="/posts/:id" element={<PostDetail />} />
            </Routes>
        </Router>
    );
}

export default App;