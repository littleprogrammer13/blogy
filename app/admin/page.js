'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [logged, setLogged] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const login = (user, pass) => {
    if (user === 'Vilor' && pass === '212') {
      setLogged(true);
      setMessage('');
    } else {
      setMessage('Usuário ou senha incorretos.');
    }
  };

  const submitPost = async () => {
    if (!title || !content) return setMessage('Preencha todos os campos.');
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
    if (res.ok) {
      setMessage('✅ Post publicado!');
      setTitle('');
      setContent('');
    } else {
      setMessage('❌ Erro ao publicar.');
    }
  };

  const logout = () => {
    setLogged(false);
    setTitle('');
    setContent('');
  };

  if (!logged) {
    let user = '', pass = '';
    return (
      <div style={container}>
        <h1>🔐 Login Admin</h1>
        <input placeholder="Usuário" onChange={e => user = e.target.value} style={input} /><br />
        <input placeholder="Senha" type="password" onChange={e => pass = e.target.value} style={input} /><br />
        <button onClick={() => login(user, pass)} style={btnPrimary}>Entrar</button>
        <p style={{ color: 'red' }}>{message}</p>
      </div>
    );
  }

  return (
    <div style={container}>
      <h1>📝 Novo Post</h1>
      <input
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={input}
      /><br />
      <textarea
        placeholder="Conteúdo"
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ ...input, height: '100px' }}
      /><br />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={submitPost} style={btnPrimary}>💾 Publicar</button>
        <button onClick={() => { setTitle(''); setContent(''); }} style={btnSecondary}>🧹 Limpar</button>
        <button onClick={logout} style={btnDanger}>🚪 Sair</button>
      </div>
      <p>{message}</p>
    </div>
  );
}

const container = { padding: 20, fontFamily: 'sans-serif', maxWidth: 600, margin: '0 auto' };
const input = { width: '100%', padding: 8, marginBottom: 10, borderRadius: 6, border: '1px solid #ccc' };
const btnPrimary = { background: '#0070f3', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer' };
const btnSecondary = { background: '#999', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer' };
const btnDanger = { background: '#e63946', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer' };
