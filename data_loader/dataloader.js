const Redis = require('ioredis');
const assert = require('assert').strict;

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD
});

const flushDatabase = async () => {
  await redisClient.flushdb();
};

const createIndices = async () => {
  // TODO
};

const loadUserProfiles = async () => {
  const users = require('../sample_data/users.json');

  for (const user of users) {
    console.log(`Loading user ${user.username}.`);
    await Promise.all([
      redisClient.hset(`users:${user.username}`, user),
      redisClient.sadd('usernames', user.username)
    ]);
  }
};

const verifyUserProfiles = async () => {
  const numUsers = await redisClient.scard('usernames');
  const ada = await redisClient.hgetall(`users:ada`);

  try {
    assert.equal(numUsers, 6);
    assert.equal(ada.firstname, 'Ada');
    assert.equal(ada.country, 'England');
    console.log('User verification OK.');
  } catch (err) {
    console.log('User verification failed:');
    console.log(err);
  }
};

const loadMessages = async () => {
  // TODO
};

const verifyMessages = async () => {
  // TODO
};

const verifySearch = async () => {
  // TODO
};

const loadAndVerifyData = async () => {
  await flushDatabase();
  await createIndices();
  await loadUserProfiles();
  await verifyUserProfiles();
  await loadMessages();
  await verifyMessages();
  await verifySearch();
  redisClient.quit();
};

loadAndVerifyData();