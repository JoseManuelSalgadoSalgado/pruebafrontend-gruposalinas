import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api';

const POSTS_PER_PAGE = 15;

function ListadePosts() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        getPosts().then(response => setPosts(response.data));
    }, []);

    const startIndex = currentPage * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;

    const currentPosts = posts.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (endIndex < posts.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Bienvenido</h1>
            <div className="mb-3">
                <Link to="/posts/new" className="btn btn-primary">
                    Agregar Post
                </Link>
            </div>
            <h2>Estos son todos los posts:</h2>

            <div className="row">
                {currentPosts.map(post => (
                    <div key={post.id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body.substring(0, 100)}...</p>
                                <Link to={`/posts/${post.id}`} className="btn btn-primary">Ver más</Link>
                                <Link to={`/posts/edit/${post.id}`} className="btn btn-secondary btn-sm ms-2">Editar</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-between mt-4">
                <button
                    className="btn btn-secondary"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 0}
                >
                    Anterior
                </button>
                <button
                    className="btn btn-primary"
                    onClick={handleNextPage}
                    disabled={endIndex >= posts.length}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default ListadePosts;
