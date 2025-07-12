import { createClient } from 'redis';
import { redisConfig, isDevelopment } from '../config/env.js';

const redisClient = createClient({ url: redisConfig.url });

redisClient.on('error', (err) => {
  if (isDevelopment()) {
    console.error('🔴 Redis Client Error:', err);
  }
});

(async () => {
  try {
    await redisClient.connect();
    if (isDevelopment()) {
      console.log('🔴 Connected to Redis');
    }
  } catch (err) {
    console.error('🔴 Could not connect to Redis:', err);
  }
})();

export const setCache = async (key, value, ttl = 3600) => {
  await redisClient.set(key, JSON.stringify(value), { EX: ttl });
};

export const getCache = async (key) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

export default redisClient; 