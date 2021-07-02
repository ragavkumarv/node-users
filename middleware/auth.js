import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    console.log(token);
    const verified = jwt.verify(token, "mysecretkey");
    next();
  } catch (err) {
    res.status(500);
    res.send({ err: err.message });
  }
};
