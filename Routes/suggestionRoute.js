const router = require("express").Router();

const SuggestionController = require("../Controllers/suggestionController");

router.post("/", SuggestionController.createSuggestion);
router.delete("/:id", SuggestionController.deleteSuggestion);
router.get("/", SuggestionController.getAllSuggestion);
router.get("/:id", SuggestionController.getSuggestion);
router.put("/:id", SuggestionController.updateSuggestion);
module.exports = router;