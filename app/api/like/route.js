import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'posts.json');

export async function POST(req) {
  const { id } = await req.json();
  const posts = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const post = posts.find(p => p.id === id);
  if (!post) return new Response('Not found', { status: 404 });

  post.likes++;
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));

  return Response.json(post);
}
