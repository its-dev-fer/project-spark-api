import cors from 'cors';
import 'dotenv/config'
import express, { Request, Response } from "express";
import routerAuth from './routes/example.route';

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use('/auth', routerAuth);

app.use(cors({
  origin: "*",
  methods: "GET,PUT,PATCH,POST,DELETE"
}));

// cómo importar una ruta:
// app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("OK"); // Health-check
  
});

const startServer = async () => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};




startServer();
