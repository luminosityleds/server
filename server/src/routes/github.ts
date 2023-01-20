const express = require("express");
const cors = require("cors");
const axios = require("axios");
const queryString = require("querystring");

const app = express();
const router = require('./routes')
const PORT = 4000;
const CLIENT_ID = process.env.GH_ID;
const CLIENT_SECRET = process.env.GH_SECRET;

app.use("/", router);
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Test route
router.get("/login", async (req: any, res: any) => {
  res.send("success");
});

// Return url on successful Github authorization
router.get("/github/callback", async (req: any, res: any) => {
  const code = req.query.code;

  if (!code) {
    return res.send("Error: No Code");
  }

  // Retrieving the access token
  const userToken = await axios.post(`https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`, {
    headers: {
      "Accept": "application/json"
    }
  }).then((response: any) => {
    console.log(response.data);
  }).catch((err: Error) => {
    console.log(err);
  })

  // Retrieving user info
  const accessToken = queryString.parse(userToken)
  const user = await axios.get("https://api.github.com/user", {
    headers: {
      "Authorization": `Bearer ${accessToken.access_token}`,
    }
  })
  .then((response: any) => console.log(response.data))
  .catch((err: any) => {
    console.log("Error cannot retrieve user from Github");
  });

  res.send(user);
})

export {};
