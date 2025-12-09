import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'db', 'usuarios-db.json');


export function ensureDataFile() {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
  }
}

export function getUsers() {
  ensureDataFile();
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
}

export function saveUser(user: any) {
  const users = getUsers();
  users.push(user);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
}