import { Router } from "express";
import * as threadController from "../../controllers/thread";

export const threads = Router();

threads.get("/", threadController.index);

threads.post("/", threadController.store);

threads.get("/:id", threadController.show);

threads.put("/:id", threadController.update);

threads.delete("/:id", threadController.destroy);
