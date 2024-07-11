import { redisClient } from "../index.js";
import Journal from "../models/journal.model.js";
import { getFromRedis, RedisKeys, setInRedis } from "../utils/redisHelper.js";

const journalController = {
    // get all blogs
    getJournals: async (req, res) => {
        // middleware will put userId in reqBody
        const {userId} = req;
        const cacheKey = RedisKeys.aUserJournals(userId);

        try {
            const cacheData = await getFromRedis(cacheKey);
            if (cacheData) {
                return res.status(200).json({data: cacheData});
            }

            const data = await Journal.find({userId}).sort({updatedAt: -1});
            if (data){
                await setInRedis(cacheKey, data, 86400*7); // 7day cache
                return res.status(200).json({ data });
            }
            res.status(200).json({message: "No Journal Found!", data: []})
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Error Occured!" });
        }
    },

    getSingleJournal: async (req, res) => {
        const { id } = req.params;
        try {
            const journal = await Journal.findById(id);
            if (!journal) return res.status(404).json({ error: 'Journal not found' });
            res.status(200).json({ data: journal });
        } catch (error) {
            res.status(500).json({ message: "Internal Error Occured!" });
        }
    },
    postJournal: async (req, res) => {
        // we'll get userId from auth middleware
        const userId = req.userId;
        const cacheKey = RedisKeys.aUserJournals(userId);

        try {
            const { description } = req.body;
            const newJournal = new Journal({ userId, description });
            await newJournal.save();
            res.status(200).json({ message: "Journal Created Successfully" });

            redisClient.del(cacheKey);
        } catch (error) {
            res.status(500).json({ message: "Internal Error Occured!" });
        }
    },
    deleteJournal: async (req, res) => {
        const { id } = req.params;
        try {
            const journal = await Journal.findByIdAndDelete(id);
            if (!journal) return res.status(404).json({ message: 'Post not found' });
            res.json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: "Internal Error Occured" });
        }
    },
    updateJournal: async (req, res) => {
        // we'll get id from params
        const { id } = req.params;
        try {
            const { description } = req.body;
            const journal = await Journal.findByIdAndUpdate(
                id,
                { description },
                { new: true }
            );
            if (!journal) return res.status(404).json({ message: 'Journal not found' });
            res.status(200).json({ message: "Journal Updated Successfully" })
        } catch (error) {
            res.status(500).json({ message: "Internal Error Occured!" })
        }
    }
}

export default journalController