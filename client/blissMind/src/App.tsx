import './App.css'

import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from './Auth/AuthProvider.tsx';

// pages
import Landing from "./pages/Landing.tsx";
import CreateBlog from "./pages/CreateBlog.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
// import Blogs from "./pages/Blog.tsx";

import Navbar from "./components/Navbar.tsx";
import BlogPage from "./components/BlogPage.tsx";
import Chat from "./components/Chat.tsx";
import NotFound from "./components/NotFound.tsx";
import Confessions from "./components/Confessions.tsx";
import Journals from "./components/Journals.tsx";
import SessionPage from "./components/SessionPage.tsx";
import Goals from "./components/Goals.tsx";
import GoalPage from "./components/GoalPage.tsx";
import UpdateConfession from "./components/subComponents/UpdateConfession.tsx";
import { CreateJournal } from "./components/subComponents/CreateJournal.tsx";
import Footer from "./components/Footer.tsx";
import BlogCards from "./components/BlogCards.tsx";
import MyConfessions from './components/subComponents/MyConfessions.tsx';
import MyBlogs from './components/subComponents/MyBlogs.tsx';
// import {BiMessageSquareDetail} from "react-icons/bi";
// import {useState} from "react";



function App() {
    // const [openModal, setOpenModal] = useState(false);
    const { user } = useAuth();

    const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
        return user.userId ? element : <Navigate to="/login" />;
    };

    return (
        <>
            <Navbar />
            <Routes>
                {!user.userId && (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </>
                )}

                <Route path="/" element={<Landing />} />
                <Route path="/blog/:id" element={user ? <BlogPage /> : <Login />} />
                <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} />
                <Route path="/blogs" element={<ProtectedRoute element={<BlogCards />} />} />
                <Route path="/blog/:id" element={<ProtectedRoute element={<BlogPage />} />} />
                <Route path="/edit/:id" element={<ProtectedRoute element={<UpdateConfession />} />} />
                <Route path="/mygoals" element={<ProtectedRoute element={<Goals />} />} />
                <Route path="/blog/create" element={<ProtectedRoute element={<CreateBlog />} />} />
                <Route path="/goal/:id" element={<ProtectedRoute element={<GoalPage />} />} />
                <Route path="/journal/create" element={<ProtectedRoute element={<CreateJournal />} />} />
                <Route path="/session/:id" element={<ProtectedRoute element={<SessionPage />} />} />
                <Route path="/confessions" element={<ProtectedRoute element={<Confessions />} />} />
                <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />}>
                    {user.type == "professional" && <Route path="blog" element={<MyBlogs />} />}
                    {user.type == "student" && <Route path="journal" element={<Journals />} /> }
                    <Route path="confession" element={<MyConfessions />} />
                </Route>
                <Route path={`/*`} element={<NotFound />} />
            </Routes>
            {/* {openModal && <ChatModal setOpenModal={setOpenModal}/>}
            <div className={`fixed p-5 text-3xl bg-gray-100 shadow-lg bottom-10 right-10 cursor-pointer rounded-full`} onClick={()=> setOpenModal(true)}><BiMessageSquareDetail/></div> */}
            <Footer />
        </>
    )
}

export default App
