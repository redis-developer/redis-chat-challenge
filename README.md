# Redis Challenge: Build a Real-Time, Multi-User Chat Platform

Slack, Discord, and WhatsApp have proven that responsive, real-time chat is an essential communication technology. This challenge is an opportunity to build your own real-time chat platform. [Watch our intro video on YouTube](https://www.youtube.com/watch?v=xKGSAdbTgfU).

## Why Build a Chat App?

A chat application is both **extremely satisfying to build** and **easy to explain** to the judges. There's plenty of features you can build to express your creativity. And the skills you'll learn in building a real-time app will help you throughout your software engineering career.

## Tech Stack

You can use any server technology you like, but for the back-end database, we'd like you to use Redis. Yes, Redis is often used as an ephemeral caching layer, but Redis is also a real-time database with [persistence](https://redis.io/topics/persistence), [strong consistency](https://github.com/RedisLabs/redisraft) (soon), an extensive array of [data structures](https://redis.io/commands#stream), and [full-text search](https://www.youtube.com/watch?v=infTV4ifNZY).

Redis is also the most-loved database. [It's true!](https://insights.stackoverflow.com/survey/2021#section-most-loved-dreaded-and-wanted-databases)

## Data Layer

What's nice about this challenge is we're going to give you a lot of help in building the data layer. There are several interesting data modeling questions, including:

* How do you store chat messages?
* How do you represent chat rooms and users?
* How do you publish real-time updates?
H* ow do you search for messages?

We explain all of this in the Redis data modeling guide below. We also provide some suggestions on how to implement more complex features.

## Application Stack

Although you can use any server stack you like, we'll assume in the guide that you're going to build a Node.js API layer that talks to Redis, and a front end using your preferred front-end framework.

Some use cases, like notifications, will require data from the back end to be pushed to the front end. For this, consider [websockets](https://blog.logrocket.com/websockets-tutorial-how-to-go-real-time-with-node-and-react-8e4693fbf843/) or [server sent events](https://auth0.com/blog/developing-real-time-web-applications-with-server-sent-events/).

## Need Help?

We've created a [channel](https://discord.gg/cEtjCyVa8f) (#remotebase-hackathon) on the [official Redis Discord](https://discord.gg/cEtjCyVa8f) just for this hackathon, and we'll be around to answer your questions!

You should also check out some of the docs and videos below:

**Docs:**

* [redis.io](https://redis.io/): Redis documentation, including a complete command reference.
* [ioredis](https://www.npmjs.com/package/ioredis): a Redis client for Node.js
* [Node.js Redis crash course](https://developer.redis.com/develop/node/node-crash-course/) on Redis Developer
* [Introduction to Redis Streams](https://redis.io/topics/streams-intro)

**Videos:**

* [ioredis Up and Running video](https://www.youtube.com/watch?v=NnM9jBZX_3Y)
* [Redis Sets Explained video](https://www.youtube.com/watch?v=PKdCppSNTGQ)
* [Redis Hashes Explained video](https://www.youtube.com/watch?v=-KdITaRkQ-U)
* [Redis Streams Explained video](https://redis.io/topics/streams-intro)
* [Querying, Indexing and Full Text Search in Redis video](https://www.youtube.com/watch?v=infTV4ifNZY)
* [ioredis Argument and Reply Transformers video](https://www.youtube.com/watch?v=gLh9VS73Bn8) (example of working with Redis Streams using ioredis and Node.js)

**Tools:**

* [Node.js](https://nodejs.org/) (we recommend the latest LTS version where possible)
* [redis-cli documentation](https://redis.io/topics/rediscli)
* [RedisInsight](https://developer.redis.com/explore/redisinsight/): a graphical tool for managing and editing data in a Redis database.
* You may need to install [Docker Desktop](https://www.docker.com/get-started) if you choose to run Redis in Docker (we also provide a cloud option that doesn't require Docker)
* Your favorite IDE (we like [VSCode](https://code.visualstudio.com/Download) but anything you are comfortable and can be productive with will be perfect for this challenge)

## Up and Running with Redis and Node.js

To take part in this challenge, you'll need a Redis instance with the RediSearch module installed.  We've provided two ways to get up and running… Docker, and Redis Enterprise Cloud.

### Using Docker

We've made a repository available for this challenge on GitHub.  To start Redis in a Docker container, you'll need to [install Docker Desktop](https://www.docker.com/get-started) then clone the repository and start Redis using the Docker compose file provided:

```bash
$ git clone https://github.com/redis-developer/redis-chat-challenge.git
$ cd redis-chat-challenge
$ docker-compose up -d
```

This starts a Redis server instance on port 6379.  You can connect to it using [redis-cli](https://redis.io/topics/rediscli) as follows:

```bash
$ docker exec -it redischatapp redis-cli
127.0.0.1:6379>
```

You may also want to install [RedisInsight](https://developer.redis.com/explore/redisinsight/) instead of using redis-cli for administration.  Once installed, configure it to find Redis at localhost port 6379 with no password.

When you're done using Redis, stop the container:

```bash
$ cd redis-chat-challenge
$ docker-compose down
```

Redis persists your data to a folder named "redisdata" inside the "redis-chat-challenge" folder.  You can stop and restart the container without losing data.

## Using Redis Enterprise Cloud Free Tier

Redis provides a free 30Mb Redis Instance as part of its Redis Enterprise Cloud service.  These databases can also be configured to include the RediSearch module, which is required to complete this challenge. To sign up for Redis Enterprise Cloud and create a database, follow the [instructions here](https://developer.redis.com/create/rediscloud).  

**Note:** Be sure to select the RediSearch module when choosing which module to install.

Once you have a database hostname, port and password, note them down somewhere safe.  You'll need them later when setting up RedisInsight and configuring your Node.js application.

Next, follow [these instructions](https://developer.redis.com/explore/redisinsight/getting-started/) to set up RedisInsight and connect to your database using the hostname, port and password.

## Creating Search Indices and Loading Sample Data

Now you're up and running with a Redis instance, it's time to load some sample data and create the search indices that RediSearch needs.

If you haven't already cloned the GitHub repository for this challenge, do so now:

```bash
$ git clone https://github.com/redis-developer/redis-chat-challenge.git
$ cd redis-chat-challenge
```

We've provided a sample data loader, use it to populate your Redis instance with a small dataset:

```bash
$ cd data_loader
$ npm install
```

If you're using Redis Enterprise Cloud, set your cloud database credentials using environment variables.  If using Docker, you can omit this step.

```bash
$ export REDIS_HOST=<hostname for Redis Enterprise>
$ export REDIS_PORT=<port number for Redis Enterprise>
$ export REDIS_PASSWORD=<password for Redis Enterprise>
```

**Note:** these three values are secrets, don't include them directly in your code, or commit them to source control!

Now, run the data loader tool:

```bash
$ npm start
```

You should expect to see the following output:

```bash
$ npm start

> dataloader@1.0.0 start
> node dataloader.js

Loading user wasim.
Loading user simon.
Loading user antirez.
Loading user yaz.
Loading user woz.
Loading user ada.
User verification OK.
Posting message by wasim to channel cricket.
Posting message by ada to channel tech.
Posting message by wasim to channel tech.
Posting message by woz to channel random.
Posting message by yaz to channel cricket.
Posting message by simon to channel cricket.
Message verification successful.
Search verification successful.
```

**Note:** the data loader first erases all data from Redis, so if you run it a second time you'll lose any additional data that you might have added.

Use RedisInsight or redis-cli to browse the contents of your Redis instance. When using redis-cli you will need to use the [KEYS](https://redis.io/commands/keys) or [SCAN](https://redis.io/commands/scan) commands to discover key names.  Use the browser view on RedisInsight to see all of the keys.

## ioredis Quick Start

To use ioredis in your own Node.js project, install it:

```bash
$ npm install ioredis

added 13 packages, and audited 14 packages in 710ms

1 package is looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Connect to a Redis instance by creating a new Redis client, specifying the host, port and password to connect to:

```javascript
const Redis = require('ioredis');

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD
});
```

For Redis Enterprise Cloud, these values were generated when you created your database.  For Docker, the default values localhost / 6379 / no password are what you need.

Use your Redis client instance to send commands to Redis.  ioredis exposes a function named for each Redis command.  These functions generally take the name of a Redis key as the first argument, followed by other parameters that the command requires - passed as strings.

For example, the [HMGET](https://redis.io/commands/hget) command gets multiple, named fields from a Redis Hash.  To get the firstname and city fields for a user, we'd use it like this:

```javascript
const values = await redisClient.hmget('user:ada', 'firstname', 'city');
```

values then contains an array of the field values, in the order that they were requested:

```javascript
[ 'Ada', 'Ravenshead' ]
```

The [HSET command](https://redis.io/commands/hset) for setting name/value pairs in a Redis hash can take an object as its argument:

```javascript
const user = {
  username: 'demo',
  firstname: 'Demo',
  lastname: 'User',
  city: 'Demoville',
  country: 'Demoland'
};

const response = await redisClient.hset('user:demo', user);
```

which creates a hash in Redis:

```bash
127.0.0.1:6379> hgetall user:demo
 1) "username"
 2) "demo"
 3) "firstname"
 4) "Demo"
 5) "lastname"
 6) "User"
 7) "city"
 8) "Demoville"
 9) "country"
10) "Demoland"
```

For this challenge, you'll also need to work with commands for the RediSearch module.  RediSearch is an optional module for Redis, so its commands aren't built into ioredis as functions.  To call a RediSearch command, use the ioredis "call" function, which sends an arbitrary command to Redis for execution.

For example if we wanted to run this command to find users with first name "Simon" who are in Nottingham:

```
FT.SEARCH idx:users "@firstname:Simon @city:{Nottingham}"
```

Our code would look like this:

```javascript
const response = await redisClient.call('FT.SEARCH', 'idx:users', '@firstname:Simon @city:{Nottingham}', 'LIMIT', '0', '999999');
```

## Building a Redis-backed Data Layer

You should implement some or all of these use cases in your solution.

### As a new user, I want to register an account on the system so that I can join in with the chat:

**Check if a specific username is available. For example, let's check if user "wasim" is available:**

Usernames are kept in a Redis set whose key is "usernames".

```bash
127.0.0.1:6379> sismember usernames wasim
(integer) 0
```

* 0 = yes it is (username isn't currently in the set at key usernames)
* 1 = no it isn't (username is in the set at key usernames)

Create a new user as a Redis hash for the user's details.  We'll give these hashes keys using the pattern "user:<username>":

```bash
127.0.0.1:6379> hset user:wasim firstname Wasim lastname Akram city Lahore country Pakistan username wasim
(integer) 5
```

**User schema:**

|Field|Value|
|---------|-----------------------------------------------------------------------------------------------------------------|
|firstname                   |User's first name                                                                             |
|lastname                    |User's last name                                                                              |
|city                        |User's city of residence                                                                      |
|country                     |User's country of residence                                                                   |
|username                    |User's username on the system                                                                 |
|channel:&lt;channel name&gt;|ID of the last message this user saw in the &lt;channel name&gt; channel (see later use cases)|

Add the new user's username to the Redis set used to track all usernames:

```bash
127.0.0.1:6379> sadd usernames wasim
(integer) 1
```

* 1 = number of new members added to the set

### As a user, I want to see the profile associated with a given user ID:

Let's get the user profile for the user with username "wasim":

```bash
127.0.0.1:6379> hgetall user:wasim
 1) "firstname"
 2) "Wasim"
 3) "lastname"
 4) "Akhram"
 5) "city"
 6) "Lahore"
 7) "country"
 8) "Pakistan"
 9) "username"
10) "wasim"
```

### As a user, I want to be able to see a list of available chat channels:

Channel names are kept in a Redis set whose key name is "channels".

```bash
127.0.0.1:6379> smembers channels
1) "general"
2) "cricket"
3) "random"
4) "tech"
5) "dance"
6) "cycling"
```

### As a user, I want to be able to create a new chat channel:

**Check if a specific channel already exists e.g. let's check if channel "cricket" is available:**

```bash
127.0.0.1:6379> sismember channels cricket
(integer) 1
127.0.0.1:6379> sismember channels sewing
(integer) 0
```

* 0 = channel doesn't exist, go ahead and make it
* 1 = channel exists already, nothing else to do

**Create a new channel if it didn't already exist:**

To create a new channel, just add its name to the set of channels, whose key is "channels".  Redis will create this set for you if it doesn't already exist:

```bash
127.0.0.1:6379> sadd channels sewing
(integer) 1
```

* 1 = number of new members added to set

### As a user, I want to be able to post a new message to a chat channel:

Create a new entry in the channel's stream in Redis, and get back a message ID.  Use the [Redis XADD command](https://redis.io/commands/xadd) for this. If this is the first message, Redis will create the stream for you.  We'll use the pattern "channel:&lt;channel name&gt;" for the stream key and set a single name/value pair as the payload for each entry:

```bash
127.0.0.1:6379> xadd channel:cricket * type message
"1631566566616-0"
```

Here, "*" tells Redis to generate a new message ID for you.  This takes the form of a timestamp, see the [XADD documentation](https://redis.io/commands/xadd) for more information.

Then, create a new message hash in Redis for the message using the [HSET command](https://redis.io/commands/hset).  We'll store the message at the key "message:&lt;message ID&gt;":

```bash
127.0.0.1:6379> hset message:1631566566616-0 channel cricket username wasim message "Did you see the game today?"
(integer) 3
```

**Message schema:**

|Field   |Value                                       |
|--------|--------------------------------------------|
|channel |Channel name that the message was posted to.|
|username|Username that posted the message.           |
|message |The message text.                           |

### As a user, I want to be able to see the last <number> of messages posted to a chat channel:

**Get the last 2 message IDs in the "cricket" channel:**

The [XREVRANGE command](https://redis.io/commands/xrevrange) retrieves entries from a stream:

```bash
127.0.0.1:6379> xrevrange channel:cricket + - count 2
1) 1) "1631567261312-0"
   2) 1) "type"
      2) "message"
2) 1) "1631567227135-0"
   2) 1) "type"
      2) "message"
```

**Note:** here, the most recent messages are returned first.

**Get all message IDs in the "cricket" channel:**

We can use the [XRANGE command](https://redis.io/commands/xrange) for this:

```bash
127.0.0.1:6379> xrange channel:cricket - +
1) 1) "1631566566616-0"
   2) 1) "type"
      2) "message"
2) 1) "1631567199836-0"
   2) 1) "type"
      2) "message"
3) 1) "1631567227135-0"
   2) 1) "type"
      2) "message"
4) 1) "1631567261312-0"
   2) 1) "type"
      2) "message"
```

**Note:** here, the most recent messages are returned last.

Once you have the message IDs, get the message details for each message by retrieving the associated Redis hash from the key "message:<message ID>" using the [HGETALL command](https://redis.io/commands/hgetall):

```bash
127.0.0.1:6379> hgetall message:1631567261312-0
1) "channel"
2) "cricket"
3) "username"
4) "simon"
5) "message"
6) "A couple of nice catches too!"
```

Show the user "new" messages (i.e., those posted since the user last looked at the channel) by storing the highest message ID that the user has seen in a given channel in their profile hash. For this, you'll need the [HSET command](https://redis.io/commands/hset):

For example, let's remember that user "wasim" has seen messages up to and including "1631567261312-0" in the "cricket" channel:

```bash
127.0.0.1:6379> hset user:wasim channel:cricket 1631567261312-0
(integer) 1
```

### As a user, I want to be able to see messages posted to a chat channel since I last visited it:

Get new messages for user "wasim" in the "cricket" channel.

**First, get the last message ID that the user saw for this channel from their profile hash in Redis:**

We can use the [HGET command](https://redis.io/commands/hget) to retrieve selected fields from a Redis hash:

```bash
127.0.0.1:6379> hget user:wasim channel:cricket
"1631567261312-0"
```

If there is no last message ID for this channel in the user's profile hash, the above will return "nil":

```bash
127.0.0.1:6379> hget users:wasim channel:cricket
(nil)
```

In this case, use the ID 0 to start at the first message in the channel's stream.

Next, read messages in that channel since the last message ID (or 0), using the [XREAD command](https://redis.io/commands/xread):

```bash
127.0.0.1:6379> xread streams channel:cricket 1631567261312-0
1) 1) "channel:cricket"
   2) 1) 1) "1631568209450-0"
         2) 1) "type"
            2) "message"
      2) 1) "1631568216171-0"
         2) 1) "type"
            2) "message"
```

Then, get the Redis hash for each message ID returned using [HGETALL](https://redis.io/commands/hgetall):

```bash
127.0.0.1:6379> hgetall message:1631568216171-0
1) "channel"
2) "cricket"
3) "username"
4) "simon"
5) "message"
6) "I am looking forward to the Test match."
```

And update the user's hash to store a new latest message ID, using the highest message ID returned.  Use the [HSET command](https://redis.io/commands/hset):

```bash
127.0.0.1:6379> hset user:wasim channel:cricket 1631568216171-0
(integer) 0
```

### As a user, I want to be notified when a new message is posted to a chat channel or set of chat channels:

To achieve this, we'll need to use the blocking capabilities of the Redis [XREAD command](https://redis.io/commands/xread).  For example, let's block for up to 5 seconds (5000 milliseconds).  XREAD returns nil if no new message is added after 5 seconds, or returns earlier with the message data if one is.

**For a specific channel (when no new messages appear during the blocking period):**

```bash
127.0.0.1:6379> xread block 5000 streams channel:cricket $
1) 1) "channel:cricket"
   2) 1) 1) "1631568939209-0"
         2) 1) "type"
            2) "message"
(4.05s)
```

**For several channels at once (when no new messages appear during the blocking period):**

```bash
127.0.0.1:6379> xread block 5000 streams channel:cricket channel:dance channel:tech $ $ $
(nil)
```

**For several channels at once (when messages appear during the blocking period):**

```bash
127.0.0.1:6379> xread block 5000 streams channel:cricket channel:tech channel:dance $ $ $
1) 1) "channel:tech"
   2) 1) 1) "1631569235788-0"
         2) 1) "type"
            2) "message"
(3.76s)
```

**Note:** Redis blocking commands (such as XREAD with the block option) will block the ioredis client while they are running… no other Redis commands will be executed during this time.  You should create and use a second instance of the ioredis client when calling a blocking command.  

### As a user, I want to be able to search across all messages for mentions of a specific word or phrase:

Here we're using RediSearch to index and query the data stored in the message hashes.

We've provided a message search schema called idx:messages with the following definition:

|Field Name|RediSearch Type|
|----------|---------------|
|username  |TAG            |
|channel   |TAG            |
|message   |TEXT           |

Check out the [RediSearch query syntax documentation](https://oss.redis.com/redisearch/Query_Syntax/) for more details.

Find messages containing the word "match":

```bash
127.0.0.1:6379> ft.search idx:messages "match"
1) (integer) 1
2) "message:1631623305083-0"
3) 1) "username"
   2) "wasim"
   3) "channel"
   4) "cricket"
   5) "message"
   6) "Did you see the test match this weekend?"
```

Find messages in the "cricket" channel posted by user "simon":

```bash
127.0.0.1:6379> ft.search idx:messages "@username:{simon} @channel:{cricket}"
1) (integer) 1
2) "message:1631623342744-0"
3) 1) "username"
   2) "simon"
   3) "channel"
   4) "cricket"
   5) "message"
   6) "Fantastic catch to win the game too."
```

Find messages containing the word "sunny" across all channels:

```bash
127.0.0.1:6379> ft.search idx:messages "@message:sunny"
1) (integer) 1
2) "message:1631623332491-0"
3) 1) "username"
   2) "woz"
   3) "message"
   4) "Warm and sunny here in California today, what's it like where you are?"
   5) "channel"
   6) "random"
```

Find messages posted by "wasim" in the "tech" or "cricket" channels:

```bash
​​127.0.0.1:6379> ft.search idx:messages "@channel:{cricket|tech} @username:{wasim}" limit 0 999999
1) (integer) 2
2) "message:1631623324707-0"
3) 1) "username"
   2) "wasim"
   3) "channel"
   4) "tech"
   5) "message"
   6) "Me too,"
4) "message:1631623305083-0"
5) 1) "username"
   2) "wasim"
   3) "channel"
   4) "cricket"
   5) "message"
   6) "Did you see the test match this weekend?"
```

Perform the above query with ioredis:


```javascript
const searchResults = await redisClient.call('FT.SEARCH', 'idx:messages', '@channel:{cricket|tech} @username:{wasim}', 'LIMIT', '0', '999999');
```

searchResults contains:

```javascript
[
  2,
  'message:1631623324707-0',
  [ 
    'username', 
    'wasim', 
    'channel', 
    'tech', 
    'message', 
    'Me too,' 
  ],
  'message:1631623305083-0',
  [
    'username',
    'wasim',
    'channel',
    'cricket',
    'message',
    'Did you see the test match this weekend?'
  ]
]
```

### As a user, I want to be able to find the usernames of other users in my city and/or country:

Here we're using RediSearch to index and query the data stored in the user profile hashes.

We've provided a user profile search schema called "idx:users" with the following definition:

|Field Name|RediSearch Type|
|----------|---------------|
|firstname |TEXT           |
|lastname  |TEXT           |
|city      |TAG            |
|country   |TAG            |
|username  |TAG            |

Let's find users in Lahore (note that this is a case insensitive match):

```bash
127.0.0.1:6379> ft.search idx:users "@city:{lahore}"
1) (integer) 1
2) "user:Wasim"
3)  1) "firstname"
    2) "Wasim"
    3) "lastname"
    4) "Akram"
    5) "city"
    6) "Lahore"
    7) "country"
    8) "Pakistan"
    9) "username"
   10) "wasim"
```

Or users in England:

```bash
127.0.0.1:6379> ft.search idx:users "@country:{England}"
1) (integer) 2
2) "user:ada"
3)  1) "firstname"
    2) "Ada"
    3) "lastname"
    4) "Lovelace"
    5) "city"
    6) "Ravenshead"
    7) "country"
    8) "England"
    9) "username"
   10) "ada"
4) "user:simon"
5)  1) "firstname"
    2) "Simon"
    3) "lastname"
    4) "Prickett"
    5) "city"
    6) "Nottingham"
    7) "country"
    8) "England"
    9) "username"
   10) "simon"
```

Note: By default, RediSearch returns only the first 10 matches.  To request more than this, use the LIMIT keyword which takes a start and end offset ([see docs](https://oss.redis.com/redisearch/Commands/#ftsearch)):

```bash
127.0.0.1:6379> ft.search idx:users "@country:{England}" limit 0 999999
```

Find all users whose first name is either Simon or Wasim:

```bash
127.0.0.1:6379> ft.search idx:users "@firstname:Simon|@firstname:Wasim"
1) (integer) 2
2) "user:simon"
3)  1) "firstname"
    2) "Simon"
    3) "lastname"
    4) "Prickett"
    5) "city"
    6) "Nottingham"
    7) "country"
    8) "England"
    9) "username"
   10) "simon"
4) "user:Wasim"
5)  1) "firstname"
    2) "Wasim"
    3) "lastname"
    4) "Akram"
    5) "city"
    6) "Lahore"
    7) "country"
    8) "Pakistan"
    9) "username"
   10) "wasim"
```

Check out the [RediSearch query syntax documentation](https://oss.redis.com/redisearch/Query_Syntax/) for more details.

## Challenge: Stretch Goals

Here are some additional ideas that you might consider implementing if you have time:


* Add a new type of event in the channel stream for a "join" event when a user first requests messages for a channel.  Have these events show up in the channel as messages that say "&lt;username&gt; joined".  You'll need to store these as a different event type in the channel's stream, for example:

```bash
127.0.0.1:6379> xadd channel:cricket * type join username wasim
"1631573099060-0"
```

* Add a new type of event in the channel stream for a "leave" event and provide a way for users to leave channels.  Have these events show up in the channel as messages that say "&lt;username&gt; left".  Example:

```bash
127.0.0.1:6379> xadd channel:cricket * type leave username wasim
"1631614788324-0"
```

* If you choose to implement "join" and "leave" events, consider using Redis Sorted Sets to store each user's last active time for each channel.  Using this you could build a "recently active users" feature.  Check out the [Redis Sorted Set documentation on redis.io](https://redis.io/commands/zrangebyscore) for help.

* Extend the user profile with additional fields, for example:
  * Store a user's hobbies.  Extend the user profile search to find users by hobby.
  * Store a user's geographic (long/lat) location.  Extend the user profile search to find users nearby a given long/lat position.

* Implement an @ mention system for usernames, choosing appropriate Redis data structure(s) to track mentions by username.

* Create a view in your front end that shows messages received in the last 5 minutes for one or more of the channels.

* Use RediSearch to find which users have posted the most messages across all channels.



