const knex = require("../database/knex/index");
const tagsController = require("./tagsController");

class notesController {

    async createNotes (request, response){
        
        const { title, description, rating } = request.body;

        const { user_id } = request.params;
        
        console.log(request);

        const  [note_id] = await knex("notes").insert({
        
            title,
            description,
            rating,
            user_id
        
        });

        response.json();

    };
    

    async updateNotes(request, response){

        const { title, description, rating } = request.body;
        const { id } = request.params;

        await knex("notes")
            .where({ id })
            .update({
             title,
             description,
             rating
            });

            response.json()
        
    };


    async showNotes(request, response){

        const {id} = request.params

        const note = await knex("notes").where({id});
        
        return response.json(note);
    };


    async deleteNotes(request, response){
        const { user_id } = request.params;

        await knex("notes").where({user_id}).delete();
        return response.json();
    };

    
    async index(request, response){

        const {user_id, title} = request.query
        
        const notes = await knex("notes")
        .where({user_id})
        .orderBy("title")

        return response.json(notes)
    }
};

module.exports = notesController;