import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const publicRoutes = [
  '/',
  '/login',
  '/cadastro',
];

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'chave-ultra-secreta-daora123'
);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const token = req.cookies.get('session_token')?.value;
  let session = null;

  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      session = payload; 
    } catch (error) {
      console.log(`[Middleware] Token inválido na rota ${pathname}`);
      session = null;
    }
  }


  if (publicRoutes.includes(pathname) && session) {
    console.log(`[Middleware] Usuário logado em rota pública. Redirecionando para /palpites`);
    return NextResponse.redirect(new URL('/palpites', req.nextUrl));
  }

  if (!session && !publicRoutes.includes(pathname)) {
    console.log(`[Middleware] Acesso negado a ${pathname}. Redirecionando para /login`);
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
}