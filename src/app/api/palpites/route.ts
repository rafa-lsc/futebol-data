import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { getPalpitesByUserId, addPalpite, deletePalpite, updatePalpite, NovoPalpitePayload } from '@/src/libs/palpites-db';


const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'chave-ultra-secreta-daora123'
);


async function getUserIdFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload.sub as string; 
  } catch (error) {
    return null;
  }
}


export async function GET() {
  const userId = await getUserIdFromToken();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const palpites = await getPalpitesByUserId(userId);
    return NextResponse.json(palpites);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar palpites" }, { status: 500 });
  }
}


export async function POST(request: Request) {
  const userId = await getUserIdFromToken();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const body = await request.json();
    

    if (!body.nomeCamp || !body.nomeTimeA || !body.nomeTimeB) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const dados: NovoPalpitePayload = {
      nomeCamp: body.nomeCamp,
      nomeTimeA: body.nomeTimeA,
      nomeTimeB: body.nomeTimeB,
      qtdGolsA: Number(body.qtdGolsA),
      qtdGolsB: Number(body.qtdGolsB),
    };

    const novo = await addPalpite(dados, userId);
    return NextResponse.json(novo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao salvar" }, { status: 500 });
  }
}


export async function PUT(request: Request) {
  const userId = await getUserIdFromToken();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...dadosUpdate } = body;

    if (!id) return NextResponse.json({ error: "ID necessário" }, { status: 400 });

    const atualizado = await updatePalpite(id, userId, dadosUpdate);
    
    if (!atualizado) {
      return NextResponse.json({ error: "Palpite não encontrado ou permissão negada" }, { status: 403 });
    }

    return NextResponse.json(atualizado);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}


export async function DELETE(request: Request) {
  const userId = await getUserIdFromToken();
  if (!userId) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: "ID necessário" }, { status: 400 });

    const sucesso = await deletePalpite(id, userId);

    if (!sucesso) {
      return NextResponse.json({ error: "Não foi possível deletar (não encontrado ou sem permissão)" }, { status: 403 });
    }

    return NextResponse.json({ message: "Deletado com sucesso" });
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}