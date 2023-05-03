import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/auth";

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { email, password } = req.body;

  console.log("generatedPassword", password);

  let errors = [];


  if (!email) {
    errors.push({ message: "Email Required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ message: "Email Invalid" });
  }
  if (!password) {
    errors.push({ message: "Password Required" });
  }

  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  email = email.toLowerCase();
  console.log(email);
  User.findOne({ email: email })
    .then(async (user: any) => {
      if (user) {
        return res
          .status(422)
          .json({ errors: [{ message: "email already exists" }] });
      } else {
        const user = new User({
          email: email,
          password: password,
        });

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, async function (err, hash) {
            if (err) throw err;
            user.password = hash;
            user.save().then((response: any) => {
              res.status(200).json({
                success: true,
                result: response,
              });
            });
          });
        });
      }
    })
    .catch(() => {
      res.status(500).json({
        errors: [{ message: "Something went wrong" }],
      });
    });
};

export const signin = async (req: Request, res: Response) => {
  let { email, password } = req.body;

  let errors = [];
  if (!email) {
    console.log("S1");
    errors.push({ message: "email required" });
  }
  if (!emailRegexp.test(email)) {
    console.log("S2");
    errors.push({ message: "invalid email" });
  }
  if (!password) {
    console.log("S3");
    errors.push({ message: "password required" });
  }
  if (errors.length > 0) {
    console.log("S4");
    return res.status(422).json({ errors: errors });
  }
  email = email.toLowerCase();
  console.log("detailll", req.body, email, password);
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("S5");
      return res.status(404).json({
        errors: [{ message: "User not found" }],
      });
    } else {
      console.log("S6");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ message: "password incorrect" }] });
      }
      const access_token = createJWT(user.email);
      console.log(access_token);
      return res.status(200).json({
        success: true,
        token: access_token,
        message: user,
      });
    }
  } catch (err) {
    res.status(500).json({ errors: [{ message: "Something went wrong" }] });
  }
};
