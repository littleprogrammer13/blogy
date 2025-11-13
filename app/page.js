'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarPosts = async () => {
    setLoading(true);
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data.reverse());
    setLoading(false);
  };

  useEffect(() => {
    carregarPosts();
  }, []);

  const likePost = async (id) => {
    await fetch('/api/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const voltarAoTopo = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>📰 Blog do Vilor</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={carregarPosts} style={btnStyle}>🔄 Atualizar</button>
        <button onClick={voltarAoTopo} style={btnStyle}>⬆️ Topo</button>
      </div>

      {loading && <p>Carregando posts...</p>}

      {posts.map(post => (
        <div key={post.id} style={postCard}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>{new Date(post.date).toLocaleString('pt-BR')}</small>
          <br />
          <button onClick={() => likePost(post.id)} style={likeBtn}>
            👍 Curtir ({post.likes})
          </button>
        </div>
      ))}
    </main>
  );
}

const btnStyle = {
  background: '#0070f3',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  borderRadius: '6px',
  marginRight: '10px',
  cursor: 'pointer'
};

const likeBtn = {
  background: '#ff4081',
  color: 'white',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '6px'
};

const postCard = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '10px',
  marginBottom: '15px',
  background: '#fafafa'
};
