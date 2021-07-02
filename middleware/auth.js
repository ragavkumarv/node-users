import jwt from "jsonwebtoken";

// custom middleware | Interceptor
export const auth = (req, res, next) => {
  try {
    // const autorization = req.header("Authorization");
    // console.log(autorization, autorization.split(" ")[1]);
    const token = req.header("x-auth-token");
    console.log(token);
    jwt.verify(token, process.env.SECERET_KEY);
    next(); // OK
  } catch (err) {
    res.status(500);
    console.log(err);
    res.send({ err: err.message });
  }
};

// Login -> token -> store it in localStorage -> fetch call set header
