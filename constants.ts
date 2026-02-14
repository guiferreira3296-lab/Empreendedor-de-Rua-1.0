
import { User, UserRole } from './types';

export const USERS: (User & { password: string })[] = [
  { id: 1, email: 'criador@rua.com', password: 'admin', role: UserRole.CRIADOR },
  { id: 2, email: 'cliente@rua.com', password: 'user', role: UserRole.CLIENTE },
];

export const MOTIVATIONAL_MESSAGES: string[] = [
  "Parabéns! Você bateu sua meta. Isso é prova que seu esforço diário está valendo a pena.",
  "Meta alcançada! Continue firme, você está construindo sua liberdade financeira.",
  "Você conseguiu! Muitos desistem, mas você está avançando.",
  "Mais um passo rumo aos seus 5 a 6 mil por mês.",
  "Disciplina vence talento. Continue.",
  "O sucesso é a soma de pequenos esforços repetidos dia após dia. Meta batida!",
  "Isso aí! Cada meta alcançada é um degrau a mais na escada do seu sucesso.",
  "Que orgulho! Continue com essa garra e você vai longe.",
];
