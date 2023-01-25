const express = require("express");
const {
  getTasks,
  createTask,
  editTasks,
  deleteTaskById,
  updateTaskById,
} = require("../controller/TaskController");
const router = express.Router();
const { requireSignin, userMiddleware } = require("../middleware");

router.post("/task/", requireSignin, userMiddleware, createTask);

router.get("/task/", requireSignin, userMiddleware, getTasks);
router.get("/task/:id", requireSignin, userMiddleware, editTasks);
router.delete("/task/:id", requireSignin, userMiddleware, deleteTaskById);
router.put("/task/:id", requireSignin, userMiddleware, updateTaskById);

module.exports = router;
