import { FormEvent, useState } from 'react';
import { serverApi } from '../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await serverApi.post('/blogs/', {
                title,
                description: body
            });
            console.log('Blog created successfully:', response.data);
            navigate('/profile/blog')
            // Optionally, reset the form or show a success message
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    return (
        <div className={`container mx-auto my-10`}>
            <p className={`text-lg font-semibold mb-8`}>Create a new Blog.</p>
            <form onSubmit={handleSubmit} className={`flex flex-col gap-4`}>
                <div className={`flex flex-col gap-1.5`}>
                    <label className={`font-semibold`} htmlFor="title">Title</label>
                    <input
                        className={`border rounded-lg border-gray-600/50 p-2 py-1 outline-none`}
                        placeholder={`Enter a title`}
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={`flex flex-col gap-1.5`}>
                    <label className={`font-semibold`} htmlFor="body">Body</label>
                    <textarea
                        className={`border rounded-lg border-gray-600/50 h-[300px] p-2 py-1 outline-none`}
                        placeholder={`Enter blog content.`}
                        name="body"
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <button
                    className={`w-fit bg-blue-500 hover:bg-blue-600 text-white transition rounded px-14 py-2`}
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateBlog;
