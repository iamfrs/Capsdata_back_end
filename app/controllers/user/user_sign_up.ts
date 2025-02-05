import { Request, Response } from "express";
import { errorResponse, hasData, toJson } from "node_custom_utils";
import { AppDataSource } from "../../../src/data-source";
import { User } from "../../../src/entity/user";
import { hashPassword, tokenEncode } from "../../../utils/utilities";

export const UserSignUp = async (req: Request, res: Response) => {
  try {
    const { Full_name, email, password, phone } = req.body;
    if (!hasData(email)) {
      res.status(400).json({ error: "Email is required", code: 400 });
      return;
    }

    if (!hasData(password)) {
      res.status(400).json({ error: "password is required", code: 400 });
      return;
    }

    let newUser: User = new User();
    newUser.Full_name = Full_name;
    newUser.email = email;
    newUser.password = await hashPassword(password);
    // hash password is a function from utils folder used to bcrypt the password with hash
    newUser.phone = phone;
    let inserted = await AppDataSource.manager.save(User, newUser);

    let key = tokenEncode(inserted);
    // tokenEncode is a function from utils folder used to encrypt the data with jwt

    inserted.api_key = key;
    await AppDataSource.manager.save(User, inserted);

    return toJson(res, {
      data: {
        message: "signUp completed successfully",
        apiKey: key,
        id: inserted.id,
      },
    });
  } catch (error) {
    return errorResponse(res, error);
  }
};
