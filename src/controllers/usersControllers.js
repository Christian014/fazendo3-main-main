const appError = require("../utils/appError");
const sqliteConnection = require("../database/sqlite/index");
const { hash, compare } = require("bcryptjs");

class usersControllers {

    async createUsers(request, response){

        const { name, email, password } = request.body;
        
        const hashedPassword = await hash(password, 8);
        
        const database = await sqliteConnection();

        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if (checkUserExists){

            response.json("email ja esta em uso!!!");
            
            return console.log("nao vou criar pois ja esta em uso!!!");
        };

        
        await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
        
        return response.status(201).json();

    };


    async update(request, response){
            const { name, email, password, old_password } = request.body;
            const { id } = request.params;

            const database = await sqliteConnection();

            const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

            const checkEmailUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

            if(checkEmailUsersExists && checkEmailUsersExists.id !== user.id){

             return response.status(400).json("Email ja está cadastrado !!!");

            };
            
            if(password && !old_password){
                response.json("informe a senha antiga para atualizar nova senha")
            }

            if (password && old_password){
                const checkPassword = await compare(old_password, user.password);

                if (!checkPassword){
                    response.json("Senha incorreta");
                }
                user.password = await hash(password, 8);
            }
            
            
            user.name = name ?? user.name;
            user.email = email ?? user.name;

            await database.run(
            `
                UPDATE users SET
                name = ?,
                email = ?,
                password = ?,
                updated_at = DATETIME("now")
                WHERE id = ? 
            `,
            [
                user.name,
                user.email,
                user.password,
                id
            ]
        );

             return response.json("Senha alterada com sucesso");
    }

};
module.exports = usersControllers;