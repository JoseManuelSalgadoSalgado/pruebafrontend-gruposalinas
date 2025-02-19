import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = () => axios.get(`${API_URL}/posts`);
export const getPostById = (id) => axios.get(`${API_URL}/posts/${id}`);
export const getCommentsByPostId = (postId) => axios.get(`${API_URL}/posts/${postId}/comments`);
export const createPost = (post) => axios.post(`${API_URL}/posts`, post);
export const updatePost = (id, post) => axios.put(`${API_URL}/posts/${id}`, post);
export const deletePost = (id) => axios.delete(`${API_URL}/posts/${id}`);
export const getUserById = (id) => axios.get(`${API_URL}/users/${id}`);
