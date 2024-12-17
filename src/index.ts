import "dotenv/config";
import "./db/GenerateTables";
import cors from "cors";
import express, { Request, Response } from "express";
import { AuthRouter } from "./Routes/Auth.routes";
import { UserRouter } from "./Routes/User.routes";

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);

app.use(
    cors({
        origin: "*",
        methods: "GET,PUT,PATCH,POST,DELETE"
    })
);

app.get("/", (_req: Request, res: Response) => {
    res.send("OK");
});

const startServer = async () => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

startServer();
