const express = require("express");
const cors = require("cors");
const app = express();
const router = require('./routes')

const PORT = 4000;

app.use("/", router);
app.use(cors())

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

router.get("/login", (req: any, res: any) => {
  res.send("success");
});
