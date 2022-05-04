const router = require("express").Router();

const TodoController = require("../Controllers/todoController");

router.post("/", TodoController.createTodo);
router.delete("/:id", TodoController.deleteTodo);
router.get("/", TodoController.getAllTodo);
router.get("/:id", TodoController.getTodo);
router.put("/:id", TodoController.updateTodo);
module.exports = router;