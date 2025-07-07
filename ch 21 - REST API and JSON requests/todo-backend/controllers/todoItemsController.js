const TodoItem = require("../models/TodoItem");

exports.createTodoItem = async (req, res, next) => {
  console.log("Hello:", req.body);
  const { task, date } = req.body;
  const todoItem = new TodoItem({ task, date });
  await todoItem.save();
  res.status(201).json(todoItem)
}

exports.getTodoItems = async (req, res, next) => {
  console.log("Hello get items:", req.body);
  const todoItems = await TodoItem.find();
  res.json(todoItems);
}

exports.deleteTodoItem = async (req, res, next) => {
  console.log("Hello delete items:", req.body);
  const { id } = req.params;
  await TodoItem.findByIdAndDelete(id);
  res.status(204).json({ _id: id });
}

exports.markCompleted = async (req, res, next) => {
  console.log("Hello comleted items:", req.body);
  const { id } = req.params;
  const todoItem = await TodoItem.findById(id);
  todoItem.completed = true;
  await todoItem.save();
  res.json(todoItem);
}


