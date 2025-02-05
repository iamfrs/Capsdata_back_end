import { Request, Response } from "express";
import { errorResponse, hasData, toJson } from "node_custom_utils";
import { User } from "../../../src/entity/user";
import { AppDataSource } from "../../../src/data-source";
import { comparePassword, tokenEncode } from "../../../utils/utilities";

export const UserLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!hasData(email)) {
      res.status(400).json({ error: "Email is required", code: 400 });
      return;
    }

    if (!hasData(password)) {
      res.status(400).json({ error: "password is required", code: 400 });
      return;
    }

    const user = await AppDataSource.manager.findOne(User, {
      where: { email },
    });

    if (!user) {
      res.status(400).json({ error: "The user is invalid.", code: 400 });
      return;
    }

    const passwordValidate = await comparePassword(
      password,
      user?.password ?? ""
    );

    if (!passwordValidate) {
      res.status(400).json({
        error: "The email or password provided is not valid.",
        code: 400,
      });
    }

    let key = tokenEncode(user);

    user.api_key = key;
    await AppDataSource.manager.save(User, user);

    return toJson(res, {
      data: {
        message: "login success",
        key: user.api_key,
      },
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};
