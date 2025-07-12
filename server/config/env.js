import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config({ path: '.env' });

// Environment variable schema for validation
const envSchema = z.object({
  // Server Configuration
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5001'),
  CLIENT_URL: z.string().url().default('http://localhost:5173'),
  
  // Database Configuration
  MONGODB_URI: z.string().min(1, 'MongoDB URI is required'),
  
  // Redis Configuration
  REDIS_URL: z.string().default('redis://localhost:6379'),
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().default('6379'),
  REDIS_PASSWORD: z.string().optional(),
  
  // JWT Configuration
  JWT_SECRET: z.string().min(1, 'JWT Secret is required'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  
  // Cloudinary Configuration
  CLOUDINARY_CLOUD_NAME: z.string().min(1, 'Cloudinary cloud name is required'),
  CLOUDINARY_API_KEY: z.string().min(1, 'Cloudinary API key is required'),
  CLOUDINARY_API_SECRET: z.string().min(1, 'Cloudinary API secret is required'),
  
  // CORS Configuration
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  
  // File Upload Configuration
  MAX_FILE_SIZE: z.string().default('5MB'),
  ALLOWED_FILE_TYPES: z.string().default('image/jpeg,image/png,image/gif'),
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100'),
  
  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => err.path.join('.'));
      throw new Error(`Missing or invalid environment variables: ${missingVars.join(', ')}`);
    }
    throw error;
  }
};

// Export validated environment configuration
export const env = parseEnv();

// Export individual configurations for easier access
export const serverConfig = {
  port: parseInt(env.PORT),
  nodeEnv: env.NODE_ENV,
  clientUrl: env.CLIENT_URL,
  corsOrigin: env.CORS_ORIGIN,
};

export const databaseConfig = {
  mongodbUri: env.MONGODB_URI,
};

export const redisConfig = {
  url: env.REDIS_URL,
  host: env.REDIS_HOST,
  port: parseInt(env.REDIS_PORT),
  password: env.REDIS_PASSWORD,
};

export const jwtConfig = {
  secret: env.JWT_SECRET,
  expiresIn: env.JWT_EXPIRES_IN,
};

export const cloudinaryConfig = {
  cloudName: env.CLOUDINARY_CLOUD_NAME,
  apiKey: env.CLOUDINARY_API_KEY,
  apiSecret: env.CLOUDINARY_API_SECRET,
};

export const cookieConfig = {
  secret: env.COOKIE_SECRET,
  maxAge: env.COOKIE_MAX_AGE,
};

export const uploadConfig = {
  maxFileSize: env.MAX_FILE_SIZE,
  allowedFileTypes: env.ALLOWED_FILE_TYPES.split(','),
};

export const rateLimitConfig = {
  windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS),
  maxRequests: parseInt(env.RATE_LIMIT_MAX_REQUESTS),
};

export const logConfig = {
  level: env.LOG_LEVEL,
};

// Helper function to check if in development
export const isDevelopment = () => env.NODE_ENV === 'development';

// Helper function to check if in production
export const isProduction = () => env.NODE_ENV === 'production';

// Helper function to check if in test
export const isTest = () => env.NODE_ENV === 'test';

export default env; 