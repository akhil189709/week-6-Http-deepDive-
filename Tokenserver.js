const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

let users = [];
//this function should return the random long String!
function generateToken() {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  let token = "";
  for (let i = 0; i <= options.length; i++) {
    token += options[Math.floor(Math.random() * options.length)];
  }
  return token;
}

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
    (u) => u.username === username && u.password === password
  );

  if (foundUser) {
    const token = generateToken();
    foundUser.token = token;
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
  let founduser = users.find((user) => user.token == token);
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
