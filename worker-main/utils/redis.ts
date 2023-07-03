import Redis from "ioredis";

export function getRedisClient() {
  const client = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PWD,
  });

  client.on("ready", () => {
    console.log("redis is ready");
  });

  client.on("connect", () => {
    console.log("redis connected");
  });

  client.on("close", () => {
    console.log("redis closed");
  });

  client.on("end", (error) => {
    console.log("redis end", error);
  });

  client.on("reconnecting", (error) => {
    console.log("redis reconnecting", error);
  });

  client.on("error", (error) => {
    console.log("redis error", error.message);
  });

  return client;
}
