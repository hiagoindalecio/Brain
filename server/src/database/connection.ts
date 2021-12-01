import knex from 'knex';

const connection = knex({
    client: 'mysql',
    connection: {
        host: process.env.REACT_APP_MYSQL_ADRESS,
        port: 3306,
        user: process.env.REACT_APP_MYSQL_USER,
        password: process.env.REACT_APP_MYSQL_PASSWORD,
        database: process.env.REACT_APP_MYSQL_DBNAME
    },
    useNullAsDefault: true,
});

export default connection;