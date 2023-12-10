import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors';
import genreRoutes from "./routes/genreRoutes.js"
import filmRoutes from "./routes/filmRoutes.js"

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/genre', genreRoutes);
app.use('/api/v1/film', filmRoutes);

//rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to cinema website</h1>");
});


//PORT
const PORT = process.env.PORT || 8080;

// run listen

app.listen(PORT, () => {
    console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
            .white
        );
});