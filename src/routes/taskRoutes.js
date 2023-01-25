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

router.post("/task/",  createTask);

router.get("/task/",  getTasks);
router.get("/task/:id",  editTasks);
router.delete("/task/:id",  deleteTaskById);
router.put("/task/:id",  updateTaskById);

module.exports = router;
