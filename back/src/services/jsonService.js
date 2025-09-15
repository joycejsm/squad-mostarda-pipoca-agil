// src/services/jsonService.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '../../db.json');

// Função para ler o arquivo db.json e retornar os usuários
export const readUsers = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data).users;
    } catch (error) {
        // Se o arquivo não existir ou for inválido, retorna um array vazio
        console.error("Erro ao ler db.json, retornando array vazio.");
        return [];
    }
};

// Função para escrever os usuários de volta no arquivo db.json
export const writeUsers = (users) => {
    try {
        const data = { users: users };
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Erro ao escrever no db.json:", error);
    }
};