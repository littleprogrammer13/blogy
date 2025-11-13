import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'posts.json');

export async function GET() {
  const posts = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return Response.json(posts);
}

export async function POST(req) {
  const body = await req.json();
  const posts = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const newPost = {
    id: Date.now(),
    title: body.title,
    content: body.content,
    likes: 0,
    date: new Date().toISOString()
  };

  posts.push(newPost);
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));

  return Response.json(newPost);
}
