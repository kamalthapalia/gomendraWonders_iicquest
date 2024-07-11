import { Router } from "express";
const router = new Router();

import confessController from "../controllers/confess.controller.js";
import fetchuser from "../middleware/fetchUser.js";

router.get('/', confessController.getAllConfessions);
router.get('/user', fetchuser, confessController.getUserConfessions);
router.get('/:id', confessController.getSingleConfession);
router.post('/',fetchuser, confessController.postConfession);

router.patch("/:id", fetchuser, confessController.updateConfessions);
router.delete("/:id", fetchuser, confessController.deleteConfessions);

router.get('/comments/:confessionId', fetchuser, confessController.getComments);
router.post('/comment/:confessionId', fetchuser, confessController.postComment);

router.get('/reactions/:reactionId', fetchuser, confessController.getConfessionReaction);
router.post('/reaction/:reactionId', fetchuser, confessController.postConfessionReaction);
// router.post('/:confessionId/reaction', fetchuser, confessController.postConfessionReaction);


export default router;