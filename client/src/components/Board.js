import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Board = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', message: '' });
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await api.get('/posts');
    setPosts(res.data);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await  api.post('/posts', formData, {
        headers: { 'x-auth-token': token }
      });
      fetchPosts();
      setFormData({ title: '', message: '' });
    } catch (err) {
      alert('Error posting message.');
    }
  };

  // --- NEW FUNCTION ---
  const handleHug = async (postId) => {
    const token = localStorage.getItem('token');
    try {
      // The empty object {} is because PUT requests expect a body
      await api.put(`/posts/hug/${postId}`, {}, {
        headers: { 'x-auth-token': token }
      });
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="board-container">
      <button onClick={() => navigate('/')}>&larr; Back</button>
      <h1 style={{ textAlign: 'center' }}>Open Thoughts</h1>

      <div className="post-input-card">
        <form onSubmit={onSubmit}>
          <input name="title" placeholder="Title" value={formData.title} onChange={onChange} required />
          <textarea name="message" placeholder="Message..." value={formData.message} onChange={onChange} required style={{width:'100%', padding:'10px', height:'100px'}} />
          <button type="submit">Post</button>
        </form>
      </div>

      <div className="grid-layout">
        {posts.map((post) => (
          <div key={post._id} className="message-card">
            <h3 className="card-title">{post.title}</h3>
            <p className="card-body">{post.message}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
              <small style={{ color: '#aaa' }}>
                {new Date(post.createdAt).toLocaleDateString()}
              </small>

              {/* --- HUG BUTTON --- */}
              <button 
                onClick={() => handleHug(post._id)}
                style={{ 
                  background: post.hugs.includes(currentUserId) ? '#ffebee' : '#f4f4f4', 
                  color: post.hugs.includes(currentUserId) ? '#e91e63' : '#666',
                  border: '1px solid #ddd',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  width: 'auto',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.9rem',
                  marginTop: 0
                }}
              >
                🫂 {post.hugs.length} Hugs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;