
export enum UserRole {
  CLIENTE = 'CLIENTE',
  CRIADOR = 'CRIADOR',
}

export interface User {
  id: number;
  email: string;
  role: UserRole;
}

export interface Transaction {
  id: string;
  date: string; // ISO string
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Goal {
  daily: number;
  weekly: number;
  monthly: number;
}

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  videoData: string; // Changed from url to store base64 data
  fileName: string;
  fileType: string;
}

export interface ScriptContent {
  id: string;
  title: string;
  content: string;
}
