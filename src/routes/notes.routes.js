const { Router } = require("express");

const notesController = require ("../controllers/notesController");

const notesRoutes = Router();

const NotesController = new notesController();

notesRoutes.post("/:user_id", NotesController.createNotes);
notesRoutes.put("/:id", NotesController.updateNotes);
notesRoutes.get("/:id", NotesController.showNotes);
notesRoutes.delete("/:user_id", NotesController.deleteNotes);
notesRoutes.get("/", NotesController.index);

module.exports = notesRoutes;