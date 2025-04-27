import express from "express";
import cors from "cors"

import { createRouteHandler } from "uploadthing/express";

import { uploadRouter } from "./uploadthing";

const app = express();
app.use(cors())

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
        token: process.env.UPLOADTHING_TOKEN
    },
  }),
);

const PORT = 4000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  