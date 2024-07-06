const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cors_proxy = require("cors-anywhere");
const app = express();
const router = require('./routes')

const PORT = process.env.PORT || 5000;
const PROXY_PORT = process.env.PROXY_PORT || 8081;
const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_OAUTH_REDIRECT_URL;

app.use(cors());

cors_proxy.createServer({
  originWhitelist: [],            
  requireHeader: [],
  removeHeaders: ["cookie", "cookie2"]
}).listen(PROXY_PORT, function() {
  console.log(`For google: Running CORS Anywhere on port ${PROXY_PORT}`);
});

router.get("/auth/google/callback", async (req: any, res: any) => {
  const code = req.query.code;

  try {
    const { data } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: "post",
      data: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
        code,
      },
    });

    const { access_token } = data;

    const userInfo = await axios({
      url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.json(userInfo.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`For google: Server is running on port ${PORT}`);
});

export {};