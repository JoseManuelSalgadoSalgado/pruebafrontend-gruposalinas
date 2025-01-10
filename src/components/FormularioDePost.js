import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createPost, getPostById, updatePost } from '../api';

function FormularioDePost() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const { id } = useParams();
    const navigate = useNavigate(); 

    useEffect(() => {
        if (id) {
            getPostById(id).then(response => {
                setTitle(response.data.title);
                setBody(response.data.body);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const post = { title, body };

        const apiCall = id ? updatePost(id, post) : createPost(post);

        apiCall.then(() => {
            navigate('/');
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Titulo</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                            placeholder="Ingresa el titulo"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contenido</label>
                        <textarea 
                            className="form-control" 
                            value={body} 
                            onChange={(e) => setBody(e.target.value)} 
                            required 
                            placeholder="Escribe el contenido"
                            rows="6"
                        ></textarea>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <button type="submit" className="btn btn-primary px-4 py-2">
                            {id ? 'Actualizar' : 'Crear'}
                        </button>
                        <Link to="/" className="btn btn-secondary px-4 py-2">
                            Regresar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormularioDePost;
