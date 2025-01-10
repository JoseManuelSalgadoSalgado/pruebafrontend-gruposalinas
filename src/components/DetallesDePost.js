import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getPostById,
  getCommentsByPostId,
  getUserById,
  deletePost,
} from "../api";

function DetallesDePosts() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getPostById(id)
      .then((response) => {
        setPost(response.data);
        return getUserById(response.data.userId);
      })
      .then((res) => setUser(res.data))
      .catch((error) => {
        console.error(error);
      });

    getCommentsByPostId(id)
      .then((response) => setComments(response.data))
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("¿Estas seguro de que  eliminar esta publicacion?")) {
      deletePost(id)
        .then(() => {
          alert("Publicacion eliminada con exito.");
          window.location.href = "/";
        })
        .catch((error) => {
          console.error(error);
          alert("Error al eliminar la publicacion.");
        });
    }
  };

  if (!post) return <p>Cargando</p>;

  return (
    <div className="container mt-5">
      <h1>Post {post.id}</h1>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h1>{post.title}</h1>
        </div>
      </div>

      {user && (
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5>Usuario</h5>
            <p>
              <strong>Nombre:</strong> {user.name}
            </p>
            <p>
              <strong>Correo:</strong> {user.email}
            </p>
            <p>
              <strong>Direccion:</strong> {user.address.street},{" "}
              {user.address.city}
            </p>
          </div>
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <h5>Comentarios:</h5>
          <div className="accordion" id="commentsAccordion">
            {comments.map((comment, index) => (
              <div key={comment.id} className="accordion-item mb-3">
                <h2 className="accordion-header" id={`heading${comment.id}`}>
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${comment.id}`}
                    aria-expanded="true"
                    aria-controls={`collapse${comment.id}`}
                  >
                    <strong>{comment.name}</strong>
                  </button>
                </h2>
                <div
                  id={`collapse${comment.id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`heading${comment.id}`}
                  data-bs-parent="#commentsAccordion"
                >
                  <div className="accordion-body">{comment.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-danger me-2" onClick={handleDelete}>
          Eliminar
        </button>
        <Link to="/" className="btn btn-primary">
          Regresar
        </Link>
      </div>
    </div>
  );
}

export default DetallesDePosts;
