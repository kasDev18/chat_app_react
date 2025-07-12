import { createClient } from 'redis';
import { redisOptions } from '../config/redis.js';

const healthCheck = async () => {
  const client = createClient(redisOptions);
  
  try {
    await client.connect();
    console.log('✅ Redis connection successful');
    
    // Test basic operations
    await client.set('health-check', 'ok');
    const result = await client.get('health-check');
    await client.del('health-check');
    
    if (result === 'ok') {
      console.log('✅ Redis read/write operations successful');
    } else {
      throw new Error('Redis read/write test failed');
    }
    
    console.log('✅ Redis health check passed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Redis health check failed:', error.message);
    process.exit(1);
  } finally {
    await client.disconnect();
  }
};

healthCheck(); 