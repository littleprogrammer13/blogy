'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(setPosts);
  }, []);

  const likePost = async (id) => {
    await fetch('/api/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>📰 Blog do Vilor</h1>
      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ccc', padding: 10, marginTop: 10 }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => likePost(post.id)}>👍 {post.likes}</button>
        </div>
      ))}
    </main>
  );
}
