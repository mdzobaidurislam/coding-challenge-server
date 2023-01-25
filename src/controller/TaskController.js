const Task = require("../model/TaskModel");

exports.createTask = (req, res) => {
  const { name, agree, sectId } = req.body;
  const task = new Task({
    name,
    sector: sectId,
    agree,
    createdBy: "63d15d41a99a5c05152cd424",
  });

  task.save((err, task) => {
    if (err) return res.status(400).json({ err });
    if (task) {
      res.status(201).json({ task });
    }
  });
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: "63d15d41a99a5c05152cd424" })
    .select("_id name sector agree")
    .populate({ path: "sector.sectorId", select: "_id name parentId" })
    .exec();
  res.status(200).json({ tasks });
};

exports.editTasks = async (req, res) => {
  const id = req.params.id;

  if (id) {
    const task = await Task.findOne({
      _id: id,
      createdBy: "63d15d41a99a5c05152cd424",
    })
      .select("_id name sector agree")
      .populate({ path: "sector.sectorId", select: "_id name parentId" })
      .exec();
    if (task) {
      return res.status(200).json({ task });
    } else {
      return res.status(200).json({ message: "Task not found!" });
    }
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};
exports.updateTaskById = async (req, res) => {
  const id = req.params.id;

  if (id) {
    const task = await Task.findOne({
      _id: id,
      createdBy: "63d15d41a99a5c05152cd424",
    });
    if (task) {
      task.name = req.body.name;
      task.agree = req.body.agree;
      task.sector = req.body.sectId;

      const updatedTask = await task.save();
      return res.status(200).json({ message: "Task update successfully!" });
    } else {
      return res.status(200).json({ message: "Task not found!" });
    }
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

exports.deleteTaskById = (req, res) => {
  const id = req.params.id;
  if (id) {
    Task.deleteOne({ _id: id }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ message: "Task delete succssfully!" });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};
