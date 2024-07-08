import { redisClient } from "../index.js";

// get items from redis
const getFromRedis = async (key) => {
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting data from Redis:', error);
        return null;
    }
};

// set into redis
const setInRedis = async (key, data, expiration = 3600) => {
    try {
        await redisClient.set(key, JSON.stringify(data), {
            EX: expiration,
        });
    } catch (error) {
        console.error('Error setting data in Redis:', error);
    }
};

export {getFromRedis, setInRedis};