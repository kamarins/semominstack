const connection = require('../database/connection');
const crypto = require('crypto');//gera string aleatoria, no casos era a id

module.exports = {
    async index (request, response) {//listar todas as ongs
        const ongs = await connection('ongs'). select('*');
    
        return response.json(ongs);
    },

    async create(request, response){
        const {name, email, whatsapp, city, uf } = request.body;

        const id= crypto.randomBytes(4).toString('HEX');
        
        await connection('ongs').insert({ //inserindo dados na tabela
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        }) 
    
        return response.json({ id }); 
    }
};