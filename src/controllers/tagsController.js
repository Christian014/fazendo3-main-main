const knex = require("../database/knex/index");

class tagsController {

    async createTags (request, response){
        
        const { name } = request.body;

        const { user_id } = request.params;
        const { note_id } = request.params;
        
        await knex("tags").insert({
            name,
            user_id,
            note_id
        });

        response.json();

    };
};

module.exports = tagsController;