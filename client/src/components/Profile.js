import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { 'x-auth-token': token } };

      try {
        // 1. Get User Info
        const userRes = await api.get('/auth/user', config);
        setUser(userRes.data);

        // 2. Get User's Posts
        const postsRes = await api.get('/auth/posts/myposts', config);
        setMyPosts(postsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!user) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading Profile...</div>;

  return (
    <div className="board-container">
      <button onClick={() => navigate('/')}>&larr; Back to Dashboard</button>
      
      {/* Profile Header Card */}
      <div className="post-input-card" style={{ textAlign: 'center', marginTop: '20px' }}>
        <div style={{ 
          width: '80px', height: '80px', background: '#4A90E2', color: 'white', 
          borderRadius: '50%', margin: '0 auto 15px', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' 
        }}>
          {user.username.charAt(0).toUpperCase()}
        </div>
        <h2>{user.username}</h2>
        <p style={{ color: '#666' }}>{user.email}</p>
        <p style={{ fontSize: '0.9rem', color: '#888' }}>
          Member since: {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* User's Posts Section */}
      <h3 style={{ marginTop: '40px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        My Post History
      </h3>
      
      {myPosts.length === 0 ? (
        <p style={{ color: '#888', fontStyle: 'italic', marginTop: '20px' }}>You haven't posted anything yet.</p>
      ) : (
        <div className="grid-layout" style={{ marginTop: '20px' }}>
          {myPosts.map((post) => (
            <div key={post._id} className="message-card">
              <h3 className="card-title">{post.title}</h3>
              <p className="card-body">{post.message}</p>
              <small style={{ display: 'block', marginTop: '15px', color: '#aaa' }}>
                {new Date(post.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;