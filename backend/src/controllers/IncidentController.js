
const connection = require('../database/connection');

//listando os casos 
module.exports = {
    async index(request, response){ 
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count();
        
        //esquema de paginação, ja que são apenas 5 casos por pagina
        const incidents = await connection('incidents').select('*')
            .join('ongs','ongs.id', '=', 'incidents.ong_id')//juntando as tabelas
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 
                    'ongs.name', 
                    'ongs.email', 
                    'ongs.whatsapp',
                    'ongs.city', 
                    'ongs.uf']
                    );

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },


    async create(request, response ){
        
        const { title, description, value} = request.body;
        const ong_id = request.headers.authorization;//caracteriza o contexto 

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });

    },

    async delete(request, response) {
        const { id } = request.params; //id da rota
        const ong_id = request.headers.authorization; //id da ong logada
        
        //procura o incidente onde o id é valido 
        //e é da ong logada
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();//retorna apenas um resultado

        if(incident.ong_id != ong_id ){
            return response.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};

