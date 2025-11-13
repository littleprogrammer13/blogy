'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginMsg, setLoginMsg] = useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  // Função para buscar posts
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

  // Curtir post
  const likePost = async (id) => {
    await fetch('/api/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  // Login simples
  const fazerLogin = () => {
    if (user === 'Vilor' && pass === '212') {
      setIsAdmin(true);
      setShowLogin(false);
      setLoginMsg('');
    } else {
      setLoginMsg('Usuário ou senha incorretos.');
    }
  };

  // Criar novo post
  const criarPost = async () => {
    if (!newTitle || !newContent) return setStatusMsg('Preencha todos os campos!');
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, content: newContent })
    });
    if (res.ok) {
      setStatusMsg('✅ Post publicado!');
      setNewTitle('');
      setNewContent('');
      carregarPosts();
    } else {
      setStatusMsg('❌ Erro ao publicar.');
    }
  };

  // Apagar post (só admin)
  const apagarPost = async (id) => {
    if (!confirm('Tem certeza que deseja apagar este post?')) return;
    await fetch('/api/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    carregarPosts();
  };

  const voltarAoTopo = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>📰 Blog do Vilor</h1>

        {!isAdmin ? (
          <button onClick={() => setShowLogin(!showLogin)} style={btnLogin}>
            {showLogin ? '❌ Fechar' : '🔐 Login'}
          </button>
        ) : (
          <button onClick={() => setIsAdmin(false)} style={btnLogout}>🚪 Sair</button>
        )}
      </header>

      {showLogin && !isAdmin && (
        <div style={loginBox}>
          <h3>🔐 Fazer Login</h3>
          <input placeholder="Usuário" value={user} onChange={e => setUser(e.target.value)} style={input} /><br />
          <input placeholder="Senha" type="password" value={pass} onChange={e => setPass(e.target.value)} style={input} /><br />
          <button onClick={fazerLogin} style={btnPrimary}>Entrar</button>
          <p style={{ color: 'red' }}>{loginMsg}</p>
        </div>
      )}

      {isAdmin && (
        <div style={adminBox}>
          <h3>📝 Criar novo post</h3>
          <input placeholder="Título" value={newTitle} onChange={e => setNewTitle(e.target.value)} style={input} /><br />
          <textarea placeholder="Conteúdo" value={newContent} onChange={e => setNewContent(e.target.value)} style={{ ...input, height: '100px' }} /><br />
          <button onClick={criarPost} style={btnPrimary}>💾 Publicar</button>
          <button onClick={() => { setNewTitle(''); setNewContent(''); }} style={btnSecondary}>🧹 Limpar</button>
          <p>{statusMsg}</p>
        </div>
      )}

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
          <button onClick={() => likePost(post.id)} style={likeBtn}>👍 Curtir ({post.likes})</button>
          {isAdmin && (
            <button onClick={() => apagarPost(post.id)} style={btnDanger}>🗑️ Apagar</button>
          )}
        </div>
      ))}
    </main>
  );
}

// === Estilos ===
const btnStyle = { background: '#0070f3', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', marginRight: '10px', cursor: 'pointer' };
const btnPrimary = { background: '#0070f3', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginRight: '8px' };
const btnSecondary = { background: '#999', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer' };
const btnLogin = { background: '#111', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
const btnLogout = { background: '#e63946', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
const likeBtn = { background: '#ff4081', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '5px', cursor: 'pointer', marginTop: '6px', marginRight: '6px' };
const btnDanger = { background: '#e63946', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '5px', cursor: 'pointer' };
const postCard = { border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '15px', background: '#fafafa' };
const input = { width: '100%', padding: 8, marginBottom: 10, borderRadius: 6, border: '1px solid #ccc' };
const loginBox = { border: '1px solid #ddd', borderRadius: 8, padding: 20, maxWidth: 400, marginBottom: 20, background: '#f9f9f9' };
const adminBox = { border: '1px solid #ddd', borderRadius: 8, padding: 20, marginBottom: 20, background: '#eaf4ff' };
