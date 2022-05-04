const TodoModel = require("../model/todo");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const todo = require("../model/todo");

createTodo = async (req, res) => {
  try {
    const newTodo = new TodoModel(req.body);
    await newTodo.save();
    res.status(201).json({
      message: "Todo created",
      data: newTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
updateTodo = async (req, res) => {
    const Todo = await TodoModel.findById(req.params.id)
    if (Todo) {
        Todo.title=req.body.title||Todo.title;
        Todo.description=req.body.description||Todo.description;
        Todo.time=req.body.time||Todo.time;
        Todo.completed=req.body.completed||Todo.completed;
        const updatedTodo = await Todo.save();
  
      res.json(updatedTodo);
    } else {
      res.status(404);
      throw new Error("Todo not found");
    }
  };

deleteTodo = async (req, res) => {
    const Todo = await TodoModel.findById(req.params.id);
    console.log(req.param.id);
  
    if (Todo) {
      await Todo.remove();
      res.json({ message: "Todo removed" });
    } else {
      res.status(404);
      throw new Error("Todo. not found");
    }
  };
  
  getTodo = async(req, res) => {
    await TodoModel.findById(req.params.id)
    .then(objet => res.status(200).json(objet))
    .catch((err) => res.status(400).json("Error Todo"));
  };

  getAllTodo = async (req, res) => {
    await TodoModel.find()
      .then((objet) => res.status(200).json(objet))
      .catch((err) => res.status(400).json("Error getting objet"));
  };
  

  module.exports = {
    createTodo,
    deleteTodo,
    getAllTodo,
    getTodo,
    updateTodo,
  };

