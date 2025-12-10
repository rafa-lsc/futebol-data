import fs from 'fs';
import path from 'path';

const dbDirectory = path.join(process.cwd(), 'db');
const filePath = path.join(dbDirectory, 'usuarios-db.json');

export function ensureDataFile() {
  if (!fs.existsSync(dbDirectory)) {
    console.log(`[DB] Criando diretório em: ${dbDirectory}`);
    fs.mkdirSync(dbDirectory, { recursive: true });
  }


  if (!fs.existsSync(filePath)) {
    console.log(`[DB] Criando arquivo em: ${filePath}`);
    fs.writeFileSync(filePath, '[]', 'utf-8');
  }
}

export function getUsers() {
  ensureDataFile();
  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    if (!fileData) return [];
    return JSON.parse(fileData);
  } catch (error) {
    console.error("[DB] Erro ao ler usuários:", error);
    return [];
  }
}

export function saveUser(user: any) {
  const users = getUsers();
  users.push(user);
  
  console.log(`[DB] Salvando novo usuário no arquivo: ${filePath}`);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
}