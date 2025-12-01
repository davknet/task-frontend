import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
const TOKEN_FILE = './userTokens.json';


let userTokens = {};

if (fs.existsSync(TOKEN_FILE)) {
    userTokens = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
}

function saveTokens() {
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(userTokens, null, 2));
}

export function generateUserToken(userId) {
    const laravelToken = `laravel-token-for-user-${userId}`;
    const uuidToken = uuidv4();
    userTokens[uuidToken] = { userId, laravelToken };
    saveTokens();
    return uuidToken;
}

export function getBackendToken(uuidToken) {
    return userTokens[uuidToken] || null;
}
