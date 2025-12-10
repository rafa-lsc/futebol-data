import fs from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';


export interface Palpite {
  id: string;
  userId: string; 
  nomeCamp: string;
  nomeTimeA: string;
  nomeTimeB: string;
  qtdGolsA: number;
  qtdGolsB: number;
  createdAt: string;
}


export type NovoPalpitePayload = Omit<Palpite, 'id' | 'createdAt' | 'userId'>;

const dbPath = path.join(process.cwd(), 'db/palpites.json');

async function ensureDbExists(): Promise<void> {
  try {
    await fs.access(dbPath);
  } catch {
    const dirPath = path.dirname(dbPath);
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(dbPath, JSON.stringify([]));
  }
}

export async function getPalpites(): Promise<Palpite[]> {
  await ensureDbExists();
  const data = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(data) as Palpite[];
}


export async function getPalpitesByUserId(userId: string): Promise<Palpite[]> {
  const all = await getPalpites();
  return all.filter(p => p.userId === userId);
}

export async function addPalpite(dados: NovoPalpitePayload, userId: string): Promise<Palpite> {
  const palpites = await getPalpites();
  
  const novoPalpite: Palpite = { 
    id: randomUUID(), 
    userId, 
    ...dados, 
    createdAt: new Date().toISOString() 
  };
  
  palpites.push(novoPalpite);
  await fs.writeFile(dbPath, JSON.stringify(palpites, null, 2));
  return novoPalpite;
}


export async function updatePalpite(id: string, userId: string, dados: NovoPalpitePayload): Promise<Palpite | null> {
  const palpites = await getPalpites();
  const index = palpites.findIndex(p => p.id === id);


  if (index === -1 || palpites[index].userId !== userId) {
    return null;
  }

  const palpiteAtualizado = {
    ...palpites[index],
    ...dados
  };

  palpites[index] = palpiteAtualizado;
  await fs.writeFile(dbPath, JSON.stringify(palpites, null, 2));
  return palpiteAtualizado;
}

export async function deletePalpite(id: string, userId: string): Promise<boolean> {
  const palpites = await getPalpites();
  

  const palpite = palpites.find(p => p.id === id);
  if (!palpite || palpite.userId !== userId) {
    return false;
  }

  const novosPalpites = palpites.filter(p => p.id !== id);
  await fs.writeFile(dbPath, JSON.stringify(novosPalpites, null, 2));
  return true;
}