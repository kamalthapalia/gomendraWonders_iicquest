import Confess from "../models/confess.model.js";

const confessController = {
    getAllConfessions: async (req, res) => {
        try {
            const data = await Confess.find().sort({ updatedAt: -1 });
            if (data) return res.status(200).json({data });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },
    getUserConfessions: async (req, res) => {
        const {userId} = req;
        try {
            const data = await Confess.find({userId}).sort({ updatedAt: -1 });
            if (data) return res.status(200).json({data });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },
    getConfession: async (req, res) => {
        try {
            const confess = await Confess.findById(req.params.id);
            if (confess) return res.status(200).json({ confess });
            console.log(confess);
        } catch (error) {

        }
    },
    postConfession: async (req, res) => {
        // const userId = req.userId;
        const {userId, fullName} = req;

        try {
            const { description, isanonymous} = req.body;
            const username = isanonymous ? "Anonymous" : fullName;
            const newConfess = new Confess({ description, isanonymous, userId, fullName: username });
            await newConfess.save();
            res.status(200).json({ message: "Confession saved successfully" })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateConfessions: async (req, res) => {
        try {
            const { id } = req.params;
            const { description } = req.body;

            await Confess.findByIdAndUpdate(
                id,
                { description },
            )
            res.status(200).json({ message: "Confession Updated Successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error Occured!" });
        }

    },
    deleteConfessions: async (req, res) => {
        try {
            const { id } = req.params;
            await Confess.findByIdAndDelete(id);

            res.status(200).json({ message: "Confession Deleted Successfully" });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error Occured!" })
        }

    }
}

export default confessController;
