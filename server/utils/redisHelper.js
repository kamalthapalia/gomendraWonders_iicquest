import { redisClient } from "../index.js";

export const RedisConfessionKeys = {
    allConfessions: "getAllconfessions",
    aUserConfessions: (userId) => `confession_${userId}`,
    allCommentsInConfession: (interactionId) => `confession:comments:${interactionId}`,
    allReactionsInConfession: (reactionId) => `confession:reactions:${reactionId}`,
}

// get items from redis
const getFromRedis = async (key) => {
    try {
        const data = await redisClient.get(key);
        // const data = await redisClient.json.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting data from Redis:', error);
        return null;
    }
};

// const updateInRedis = async (key, newData, expiration = 300) => {
//     try {
//         const existingData = await getFromRedis(key);
//         if (!existingData) {
//             // setting
//             await setInRedis(key, newData, expiration);
//         } else if (Array.isArray(existingData)) {
//             // prepend data
//             await redisClient.json.arrInsert(key, '$', 0, newData);
//             await redisClient.expire(key, expiration);
//         } else {
//             // If existing data is not an array, replace it with a new array
//             await setInRedis(key, [existingData, newData], expiration);
//         }
//     } catch (error) {
//         console.error('Error updating data in Redis:', error);
//     }
// };

// set into redis
const setInRedis = async (key, data, expiration = 300) => {
    try {
        await redisClient.set(key, JSON.stringify(data), {
            EX: expiration
        });
        // await redisClient.json.set(key, "$", JSON.stringify(data));
        // await redisClient.expire(key, expiration)

    } catch (error) {
        console.error('Error setting data in Redis:', error);
    }
};

// export {getFromRedis, setInRedis, updateInRedis};
export {getFromRedis, setInRedis };