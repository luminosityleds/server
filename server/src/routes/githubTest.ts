const expressTest = require("express");
const corsTest = require("cors");
const appTest = express();
const router = require('./routes')

const PORT = 4000;

appTest.use("/", router);
appTest.use(corsTest())

appTest.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

router.get("/login", (req: any, res: any) => {
  res.send("success");
});
