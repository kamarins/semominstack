
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();
        table.string('title').notNullable();//criando campos da tabela
        table.string('description').notNullable();
        table.decimal('value').notNullable(); 
        
        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('ongs');
        //ong_id referencia id na tabela ongs 

      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
