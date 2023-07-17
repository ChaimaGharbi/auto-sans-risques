import Redis from 'ioredis';

const host = process.env.REDIS_HOST;
const port = Number(process.env.REDIS_PORT);
const password = process.env.REDIS_PWD;

const namespace = 'socket.io';

export const redis = new Redis({
    host,
    port,
    password
});

export async function registerUser(userId: string, socketId: string) {
    try {
        await redis.set(`${namespace}:${userId}`, socketId);
    } catch (error) {
        console.log(error);
    }
}

export async function unregisterUser(userId: string) {
    try {
        await redis.del(`${namespace}:${userId}`);
    } catch (error) {
        console.log(error);
    }

}

export function getSocketId(userId: string) {
    try {
        return redis.get(`${namespace}:${userId}`);
    } catch (error) {
        console.log(error);
    }

}
