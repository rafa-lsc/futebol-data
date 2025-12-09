import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { getUsers } from '@/src/libs/conexao-db';


const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'chave-ultra-secreta-daora123'
);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const users = getUsers();
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      return NextResponse.json({ error: "E-mail ou senha inválidos." }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "E-mail ou senha inválidos." }, { status: 401 });
    }

    const token = await new SignJWT({ sub: user.id, name: user.name, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h') 
      .sign(SECRET_KEY);

    const cookieStore = await cookies();

    cookieStore.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 2, 
      path: '/',
    });

    return NextResponse.json({ message: "Login realizado com sucesso!" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}