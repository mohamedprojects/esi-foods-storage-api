import { Router } from "express";
import multer from "multer";
import { uploadFile } from "../../utils/functions.js";

const router = Router();
const storageRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");

storageRouter.post("/files", upload, (req, res) => {
  const { file } = req;
  const { webapplink, title } = req.body;
  uploadFile(file, res, webapplink, title);
});

// Welcome
router.get("/", (req, res) => {
  res.send("Welcome to the ESI FOODS STORAGE With Firebase Storage");
});

router.use("/storage", storageRouter);

export default router;
