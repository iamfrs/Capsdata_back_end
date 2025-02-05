import * as express from "express";
import * as http from "http";
import { AppDataSource } from "./src/data-source";
import * as fileUpload from "express-fileupload";
import * as cors from "cors";
import { Request, Response } from "express";
import UserRouter from "./app/routes/user_route";

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(fileUpload());
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    const server = http.createServer(app);

    app.get("/", async (req: Request, res: Response) => {
      res.send("Hello from frs");
    });
    app.use("/img", express.static("public"));

    //─────────────────────────────── frs ───────────────────────────────

    app.use("/user", UserRouter);

    //─────────────────────────────── Frs ───────────────────────────────

    app.get("/restart", (req: Request, res: Response) => {
      process.exit(1);
    });

    app.use(function (_req: Request, res: Response) {
      return res.redirect("/");
    });

    //─────────────────────────────── Frs ───────────────────────────────

    server.listen(5000, () => {
      console.log("listening on *:5000");
    });
  })
  .catch((err) => {
    console.error("500 Server issue", err);
    process.exit(1);
  });
