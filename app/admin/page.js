'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [logged, setLogged] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const login = (user, pass) => {
    if (user === 'Vilor' && pass === '212') setLogged(true);
    else alert('Usuário ou senha incorretos');
  };

  const submitPost = async () => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    });
    if (res.ok) setMessage('Post publicado!');
  };

  if (!logged) {
    let user, pass;
    return (
      <div style={{ padding: 20 }}>
        <h1>🔐 Login Admin</h1>
        <input placeholder="Usuário" onChange={e => user = e.target.value} /><br />
        <input placeholder="Senha" type="password" onChange={e => pass = e.target.value} /><br />
        <button onClick={() => login(user, pass)}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>📝 Novo Post</h1>
      <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} /><br />
      <textarea placeholder="Conteúdo" value={content} onChange={e => setContent(e.target.value)} /><br />
      <button onClick={submitPost}>Publicar</button>
      <p>{message}</p>
    </div>
  );
}
