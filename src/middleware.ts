import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const publicRoutes = [
  '/',
  '/login',
  '/cadastro',
  '/campeonatos'
];


const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'minha-chave-secreta-super-segura'
);


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
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
      session = null;
    }
  }


  if (publicRoutes.includes(pathname) && session) {
    return NextResponse.redirect(new URL('/palpites', req.nextUrl));
  }


  if (!session && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  return NextResponse.next();
}