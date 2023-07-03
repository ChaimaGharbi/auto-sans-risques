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

export function registerUser(userId: string, socketId: string) {
  redis.set(`${namespace}:${userId}`, socketId);
}

export function unregisterUser(userId: string) {
  redis.del(`${namespace}:${userId}`);
}

export function getSocketId(userId: string) {
  return redis.get(`${namespace}:${userId}`);
}
