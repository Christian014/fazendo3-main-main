const configKnex = require("../../../knexfile");
const knex = require("knex");

const conexaoKnex = knex(configKnex.development);

module.exports = conexaoKnex;