import { Router } from "express";
const router = new Router();

import confessController from "../controllers/confess.controller.js";
import fetchuser from "../middleware/fetchUser.js";

router.get('/', confessController.getAllConfessions);
router.get('/user', fetchuser, confessController.getUserConfessions);
router.get('/:id', confessController.getConfession);
router.post('/',fetchuser, confessController.postConfession);
router.patch("/:id", confessController.updateConfessions);
router.delete("/:id", confessController.deleteConfessions);

export default router;