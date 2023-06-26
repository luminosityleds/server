const express = require("express");
const cors = require("cors");
const axios = require("axios");
const queryString = require("querystring");
const get = require("lodash.get");
const cors_proxy = require("cors-anywhere");
const app = express();
const router = require('./routes')

const PORT = process.env.PORT || 4000;
const PROXY_PORT = process.env.PROXY_PORT || 8080;
const CLIENT_ID = process.env.GH_ID;
const CLIENT_SECRET = process.env.GH_SECRET;
const PROXY_URL = process.env.PROXY_URL || "http://localhost:8080/";

app.use("/", router);
app.use(cors());

// Creates CORS Anywhere proxy
// For security purposes, origin and header needs to be specified after proxy URL has been changed to luminosityleds
cors_proxy.createServer({
  originWhitelist: [],            
  requireHeader: [],
  removeHeaders: ["cookie", "cookie2"]
}).listen(PROXY_PORT, function() {
  console.log(`Running CORS Anywhere on port ${PROXY_PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Exchanges code for an access token and retrieves user data
async function getUser ({ code }: { code: string }) {
  const userToken = await axios.post(`${PROXY_URL}github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`, {
    headers: {
      'Accept': 'application/json',
    }
  })
  .then((response: any) => response.data)
  .catch((err: Error) => {
    console.log(err);
    throw err;
  })

  const accessToken = queryString.parse(userToken);
  return axios.get("https://api.github.com/user", {
    headers: { 
      "Authorization": `Bearer ${accessToken.access_token}`,
    }
  })
  .then((response: any) => response.data)
  .catch((err: Error) => {
    console.log("Error cannot retrieve user from Github");
    throw err;
  })
}

// Return url on successful Github authorization
router.get("/github/callback", async (req: any, res: any) => {
  const code = get(req, "query.code");

  if (!code) {
    return res.send("Error: No Code");
  }

  const user = await getUser({ code });

  console.log(user);
  res.redirect("http://localhost:3000")
})

export {};
