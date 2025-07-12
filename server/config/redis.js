import { redisConfig, isDevelopment } from './env.js';

// Redis configuration options
export const redisOptions = {
  url: redisConfig.url,
  host: redisConfig.host,
  port: redisConfig.port,
  password: redisConfig.password,
  retryDelayOnFailover: 100,
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
  lazyConnect: true,
  // Production optimizations
  ...(isDevelopment() ? {} : {
    maxMemoryPolicy: 'allkeys-lru',
    save: false, // Disable persistence in production for better performance
    maxmemory: '256mb',
    maxmemoryPolicy: 'allkeys-lru'
  })
};

// Redis key prefixes for better organization
export const REDIS_KEYS = {
  USERS_SIDEBAR: 'users_sidebar',
  MESSAGES: 'messages',
  USER_SESSIONS: 'user_sessions',
  ONLINE_USERS: 'online_users'
};

// Helper function to generate cache keys
export const generateCacheKey = (prefix, ...parts) => {
  return `${prefix}:${parts.join(':')}`;
};

// Cache TTL constants (in seconds)
export const CACHE_TTL = {
  USERS: 3600, // 1 hour
  MESSAGES: 1800, // 30 minutes
  SESSIONS: 86400, // 24 hours
  ONLINE_USERS: 300 // 5 minutes
};

export default redisOptions; 