import { NextResponse } from 'next/server';

// Usaremos o mesmo array de posts em memória (importado via globalThis)
if (!globalThis.posts) globalThis.posts = [];
let posts = globalThis.posts;

export async function POST(req) {
  const { id } = await req.json();
  const post = posts.find(p => p.id === id);
  if (!post) return NextResponse.json({ error: 'Post não encontrado' }, { status: 404 });
  post.likes++;
  return NextResponse.json(post);
}
