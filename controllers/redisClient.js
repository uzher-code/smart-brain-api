const redis = require('redis');

//setup  Redis:
const redisClient = redis.createClient(process.env.REDIS_URI);


module.exports = {
	redisClient: redisClient
}