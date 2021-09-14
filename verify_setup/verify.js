const Redis = require('ioredis');

const verifySetup = async() => {
  const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD
  });

  // TODO add verification code...

  redisClient.quit();
};

verifySetup();