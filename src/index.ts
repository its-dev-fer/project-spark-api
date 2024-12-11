require("dotenv").config();
import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
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
