import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const DATA_FILE = path.join(__dirname, 'users.json');


export function readUsers() {
  try {
    if (!fs.existsSync(DATA_FILE)) return {};
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading users file:", err);
    return {};
  }
}


export function saveUsers(users) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error writing users file:", err);
  }
}


export function addUser(userId, userData, token) {
  const users = readUsers();
  users[userId] = { userData, token };
  saveUsers(users);
}


export function getUser(userId) {
  const users = readUsers();
  return users[userId] || null;
}
