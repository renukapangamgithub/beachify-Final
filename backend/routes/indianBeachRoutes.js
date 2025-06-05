import express from "express";
import { searchBeaches } from "../controllers/indianBeachController.js";

const router = express.Router();

router.get("/", searchBeaches);
router.get("/search", searchBeaches);


export default router;
