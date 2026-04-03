import express, { Request, Response, NextFunction } from "express";
import { exec } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import remoteKeys from "./src/data/RemoteKeys.json" with { type: "json" };
import config from "./config.json" with { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));
const { Keys, KeyBinaryMapping } = remoteKeys;

const app = express();

app.use(express.static(join(__dirname, "dist")));

app.get("/api/tv/*", (req: Request, res: Response) => {
  const { url } = req;
  if (url.includes("KEY_")) {
    const key = url.substring(8);
    if (Keys.includes(key)) {
      const command = `sudo ${config.pathToExecutable} ${(KeyBinaryMapping as Record<string, string>)[key]}`;
      exec(command);
      res.status(200).send(key);
    } else {
      res.status(404).send(`Unrecognised API call - unknown key: ${key}`);
    }
  } else {
    res.status(404).send("Unrecognised API call");
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (req.xhr) {
    res.status(500).send("Oops, Something went wrong!");
  } else {
    next(err);
  }
});

app.listen(config.port);
console.log(`Server running at port ${config.port}`);
