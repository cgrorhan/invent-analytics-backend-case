import { DataSource } from "typeorm"
import { Book, BorrowedBook, User } from "./entities"

const DBConnection = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT as string),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    logging: false,
    synchronize:true,
    entities: [User, Book, BorrowedBook],
})

export default DBConnection