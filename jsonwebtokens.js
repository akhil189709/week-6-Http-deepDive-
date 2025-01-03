const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "AkhilKumar1897";
const app = express();
const port = 3001;

app.use(express.json());

let users = [];
//this function should return the random long String!

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (users.find((user) => user.username === username)) {
    return res.json({
      message: "You are already signed in!",
    });
  }
  users.push({
    username: username,
    password: password,
  });

  res.json({
    message: "Signup successfully!",
  });
  console.log(users);
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const foundUser = users.find(
    (user) => user.username === username && user.password === password
  );
  if (foundUser) {
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );

    res.json({
      message: "signed in!",
      token: token,
    });
  } else {
    res.json({
      message: "Invalid username and password!",
    });
  }
  console.log(users);
});

app.get("/profile", (req, res) => {
  const token = req.headers.authorization;
  const decodedInformation = jwt.verify(token, JWT_SECRET);
  const username = decodedInformation.username;

  let founduser = users.find((user) => user.username == username);
  if (founduser) {
    res.send({
      username: founduser.username,
      password: founduser.password,
    });
  } else {
    res.send({
      message: "Invalid username and the password!",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on the port: ${port}`);
});
