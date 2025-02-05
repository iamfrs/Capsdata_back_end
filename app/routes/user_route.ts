import * as express from "express";
import { UserSignUp } from "../controllers/country/user_sign_up";
import { UserLogin } from "../controllers/country/login";

const UserRouter = express.Router();

UserRouter.post("/signUp", UserSignUp);
UserRouter.post("/login", UserLogin);

export default UserRouter;
