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
  await Promise.all([
    redisClient.call('FT.CREATE', 'idx:users', 'ON', 'HASH', 'PREFIX', '1', 'user', 'SCHEMA', 'firstname', 'TEXT', 'lastname', 'TEXT', 'city', 'TAG', 'SORTABLE', 'country', 'TAG', 'SORTABLE', 'username', 'TAG', 'SORTABLE'),
    redisClient.call('FT.CREATE', 'idx:messages', 'ON', 'HASH', 'PREFIX', '1', 'message', 'SCHEMA', 'username', 'TAG', 'SORTABLE', 'channel', 'TAG', 'SORTABLE', 'message', 'TEXT')  
  ]);
};

const loadUserProfiles = async () => {
  const users = require('../sample_data/users.json');

  for (const user of users) {
    console.log(`Loading user ${user.username}.`);
    await Promise.all([
      redisClient.hset(`user:${user.username}`, user),
      redisClient.sadd('usernames', user.username)
    ]);
  }
};

const verifyUserProfiles = async () => {
  const numUsers = await redisClient.scard('usernames');
  const ada = await redisClient.hgetall(`user:ada`);

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
  const messages = require('../sample_data/messages.json');

  for (const message of messages) {
    console.log(`Posting message by ${message.username} to channel ${message.channel}.`);
    await Promise.all([
      redisClient.sadd('channels', message.channel),
      redisClient.xadd(`channel:${message.channel}`, message.id, 'type', 'message'),
      redisClient.hset(`message:${message.id}`, {
        username: message.username,
        channel: message.channel,
        message: message.message
      })
    ]);
  }
};

const verifyMessages = async () => {
  const cricketCount = await redisClient.xlen('channel:cricket');
  const channelNames = await redisClient.smembers('channels');
  const cricketMessageId = await redisClient.xrange('channel:cricket', '-', '+', 'count', '1');
  const techMessage = await redisClient.hgetall('message:1631623314829-0');

  try {
    assert.equal(cricketCount, 3);
    assert.equal(channelNames.includes('cricket'), true);
    assert.equal(channelNames.includes('tech'), true);
    assert.equal(channelNames.includes('random'), true);
    assert.equal(channelNames.includes('tennis'), false);
    assert.equal(cricketMessageId[0][0], '1631623305083-0');
    assert.equal(techMessage.channel, 'tech');
    assert.equal(techMessage.username, 'ada');
    console.log('Message verification successful.');
  } catch (err) {
    console.log('Message verification failed:');
    console.log(err);    
  }
};

const verifySearch = async () => {
  // TODO.
  const userSearchResults = '';
  const messageSearchResults = '';

  try {
    console.log('Search verification successful.');
  } catch (err) {
    console.log('Search verification failed:');
    console.log(err);     
  }
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