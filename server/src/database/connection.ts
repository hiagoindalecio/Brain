import knex from 'knex';

const connection = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'web_project_dw'
    },
    useNullAsDefault: true,
});

export default connection;