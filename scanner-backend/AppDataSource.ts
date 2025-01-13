import { DataSource } from "typeorm"
import { SQL_EXPRESS_DATABASE, SQL_EXPRESS_PASSWORD, SQL_EXPRESS_PORT, SQL_EXPRESS_USER } from "../config_database"

export let AppDataSource = new DataSource({
    host: 'localhost',
    port: SQL_EXPRESS_PORT,
    database: SQL_EXPRESS_DATABASE,
    type: 'mssql',
    entities: ['./entities/*.entity.ts'],
    synchronize: false,
    logging: false,
    username: SQL_EXPRESS_USER,
    password: SQL_EXPRESS_PASSWORD,
    options: {
        trustServerCertificate: true
    }
})


AppDataSource.initialize().then((res) => {
    console.log("AppDataSource Initialized")
})