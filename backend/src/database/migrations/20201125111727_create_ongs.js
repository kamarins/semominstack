
exports.up = function(knex) { // o metodo up eh responsavel pela
                            //criacao da tabel
 return knex.schema.createTable('ongs', function (table) {
    table.string('id').primary();
    table.string('name').notNullable();//criando campos da tabela
    table.string('email').notNullable();
    table.string('whatsapp').notNullable(); 
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) { //deletar a table
 return knex.schema.dropTable('ongs');
};
