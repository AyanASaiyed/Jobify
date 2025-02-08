import axios from "axios";
import { oauth2client } from "../utils/googleConfig.js";
import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const googleLogin = async (req, res) => {
  try {
    const { code } = req.body;

    const googleRes = await oauth2client.getToken(code);

    oauth2client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        name: name,
        email: email,
        image: picture,
      });
    }

    const { _id } = user;

    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    return res
      .status(200)
      .json({
        message: "success",
        token,
        user,
        googleAccessToken: googleRes.tokens.access_token,
      });
  } catch (error) {
    console.log("Error in googleLogin endpoint: ", error);
    return res.status(500).json({ "Internal Server Error": error });
  }
};
