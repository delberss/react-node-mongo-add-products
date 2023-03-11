const mongoose = require('mongoose')

const connect = async () => {
    const user = process.env.MONGO_USER;
    const password = process.env.MONGO_PASSWORD;

    await mongoose.connect(
        `mongodb+srv://${user}:${password}@consultaperfil.7vwpzet.mongodb.net/?retryWrites=true&w=majority`,
        (error) => {
            if(error){
                return console.log(`Ocorreu um erro ao se conectar com o banco de dados: ${error}`)
            }

            return console.log('Conexão ao banco de dados realizada com sucesso!');
        }
    )
}

module.exports = connect;