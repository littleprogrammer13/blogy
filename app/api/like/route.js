// Compartilha o mesmo array de posts
if (!globalThis.posts) globalThis.posts = [];
let posts = globalThis.posts;

export async function POST(req) {
  const { id } = await req.json();
  const post = posts.find(p => p.id === id);
  if (!post) return new Response('Post não encontrado', { status: 404 });
  post.likes++;
  return Response.json(post);
}
