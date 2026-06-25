import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateIds } from "../middleware/validateIdsMiddleware.js";
import {
  getUsersList,
  blockSelectedUsers,
  unBlockSelectedUsers,
  deleteSelectedUsers,
  deleteUnverifiedUsersController,
} from "../controllers/userController.js";

const router = Router();

router.get("/", authMiddleware, getUsersList);
router.patch("/block", authMiddleware, validateIds, blockSelectedUsers);
router.patch("/unblock", authMiddleware, validateIds, unBlockSelectedUsers);
router.delete("/", authMiddleware, validateIds, deleteSelectedUsers);
router.delete("/unverified", authMiddleware, deleteUnverifiedUsersController);

export default router;