const { Router } = require("express");

const tagsController = require ("../controllers/tagsController");

const tagsRoutes = Router();

const TagsController = new tagsController();

tagsRoutes.post("/:user_id/:note_id", TagsController.createTags);

module.exports = tagsRoutes;