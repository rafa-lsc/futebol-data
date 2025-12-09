import { NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { getUsers, saveUser } from '@/src/libs/conexao-db';


const registerSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(4, "Senha deve ter no mínimo 4 dígitos"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0].message }, { status: 400 });
    }

    const { name, email, password } = result.data;
    const users = getUsers();


    const userExists = users.find((u: any) => u.email === email);
    if (userExists) {
      return NextResponse.json({ error: "Este e-mail já está cadastrado." }, { status: 409 });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
      id: Date.now().toString(), 
      name,
      email,
      password: hashedPassword,
    };

    saveUser(newUser);

    return NextResponse.json({ message: "Usuário cadastrado com sucesso!" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: "Erro do servidor" }, { status: 500 });
  }
}