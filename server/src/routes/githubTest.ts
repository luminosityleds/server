import { Request, Response } from 'express';
const express = require('express');
const app = express();

app.get('/github', (req: Request, res: Response) => {
  console.log("working");
})

app.listen(4000, function() {
    console.log("App listening on port 4000");
});
