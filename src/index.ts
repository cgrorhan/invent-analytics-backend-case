import express, {Request, Response} from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import DBConnection from './config'
import userRouter from './routers/user.router'
import bookRouter from './routers/book.router'
import { handleError } from './utils/appError';

dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(handleError)

DBConnection.initialize().catch((err) => {console.error("Error:  Database Connection Failed !", err)});

app.use("/users",userRouter)
app.use("/books",bookRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
