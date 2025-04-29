// @ts-check

import { createServer } from 'node:http';
import { env, exit } from 'node:process';
import { DatabaseSync } from 'node:sqlite';

const database = new DatabaseSync(':memory:');

/**
 * 
 * @param {import('node:http').IncomingMessage} request 
 * @param {import('node:http').ServerResponse} response 
 */
function handler(request, response) {
    response.end();
}

const server = createServer(handler);
const PORT = env.PORT ?? 3000;

server.listen(PORT, () => {
    console.log(`Server listening at http://127.0.0.1:${PORT}`);
});

// process.on('uncaughtException', (error, origin) => {});
// process.on('unhandledRejection', (error) => {})

// Graceful shutdown
process.on('SIGTERM', () => {
    server.close(() => {
        console.info('database closed');
        database.close();
        exit(0);
    });
});

// <Ctrl> +C 
// process.on('SIGINT', () => {});

