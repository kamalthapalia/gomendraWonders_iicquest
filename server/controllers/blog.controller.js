import Blogs from '../models/blog.model.js'

const blogController = {
    // get all blogs
    getAllBlogs: async (req, res) => {
        try {
            const data = await Blogs.find().sort({updatedAt: -1});
            return res.status(200).json({ data });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },

    getUserBlogs: async (req, res) => {
        const {userId} = req;
        try {
            const data = await Blogs.find({userId}).sort({updatedAt: -1});
            return res.status(200).json({ data });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },

    getSingleBlog: async (req, res) => {
        try {
            const blog = await Blogs.findById(req.params.id);
            if (!blog) return res.status(400).json({ message: 'Blog not found' });
            res.status(200).json({ data: blog })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    postBlog: async (req, res) => {
        const userId = req.userId;

        try {
            const { title, description } = req.body;
            const newBlog = new Blogs({userId, title, description });

            await newBlog.save();
            // console.log(newBlog);

            res.status(200).json({ message: "Blog Created Successfully" });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteBlog: async (req, res) => {
        try {
            const {id} = req.params;
            const blog = await Blogs.findByIdAndDelete(id);
            // console.log(blog)   
            if (!blog) return res.status(400).json({ error: 'Blog not found' });
            res.json({ message: 'Blog deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateBlog: async (req, res) => {
        try {
            const {id} = req.params;
            const { title, description } = req.body;
            const blog = await Blogs.findByIdAndUpdate(
                id,
                { title, description },
                { new: true }
            );
            if (!blog) return res.status(404).json({ error: 'Blog not found' });
            res.status(200).json({ message: "Blog Updated Successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error occured" })
        }
    }
}

export default blogController