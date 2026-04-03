import express from "express";
import type { Request, Response, NextFunction } from "express";
import { exec } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import remoteKeys from "./src/data/RemoteKeys.json" with { type: "json" };
import config from "./config.json" with { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));
const { Keys, KeyBinaryMapping } = remoteKeys;

const app = express();

app.use(express.static(join(__dirname, "dist")));

app.post("/api/tv/:key", (req: Request, res: Response) => {
  const key = req.params.key as string;
  if (Keys.includes(key)) {
    const command = `sudo ${config.pathToExecutable} ${(KeyBinaryMapping as Record<string, string>)[key]}`;
    exec(command);
    res.status(200).send(key);
  } else {
    res.status(404).send(`Unrecognised key: ${key}`);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (req.xhr) {
    res.status(500).send("Oops, Something went wrong!");
  } else {
    next(err);
  }
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT);
console.log(`Server running at port ${PORT}`);
