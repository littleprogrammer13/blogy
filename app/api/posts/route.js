// Banco em memória
let posts = []; // reinicia a cada deploy ou restart

export async function GET() {
  return Response.json(posts);
}

export async function POST(req) {
  try {
    const body = await req.json();
    const newPost = {
      id: Date.now(),
      title: body.title,
      content: body.content,
      likes: 0,
      date: new Date().toISOString()
    };
    posts.push(newPost);
    return Response.json(newPost);
  } catch (e) {
    console.error(e);
    return new Response('Erro ao criar post', { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    posts = posts.filter(p => p.id !== id);
    return Response.json({ success: true });
  } catch (e) {
    console.error(e);
    return new Response('Erro ao apagar post', { status: 500 });
  }
}
