import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// route
import blogRoute from './routes/blog.route.js'
import authRoute from './routes/user.route.js'
import chatRoute from './routes/chat.route.js';
import confessRoute from './routes/confess.route.js';
import journalRoute from "./routes/journal.route.js"

import connectDB from './config/dbConfig.js';

env.config();
const app = express();

// TEMP: for client side testing and allowing all origin. TODO: Remove in Production
const allowCors = (req, res, next) => {
    const origin = req.headers.origin;
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
};
app.use(allowCors);

// app.use(cors({
//     origin: "http://localhost:3001",
//     request: ["POST", "GET", "PATCH", "DELETE"]
// }));
// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// route handlers
app.use("/blogs", blogRoute);
app.use("/confess", confessRoute);
app.use("/auth", authRoute);
app.use('/aichat', chatRoute)
app.use("/journal", journalRoute)

app.use('/auth', authRoute);

const PORT = process.env.PORT || 8080;


connectDB().then(() => {

    app.listen(PORT, ()=> {
        console.log("HEll yeahhhh");
        console.log(`Running on port ${PORT}`);
    })
})