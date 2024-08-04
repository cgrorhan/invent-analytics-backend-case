import { Router, Request, Response } from 'express'
import { validateBody } from '../utils/validateBody'
import { CreateBookDto } from '../dtos'
import { BookService } from '../services'

const router = Router()
const bookService = new BookService()

router.get("/",async(req:Request, res:Response) => {
    res.status(200).send(await bookService.getBooks())
})

router.get("/:id", async(req:Request, res:Response) => {
    const { id } = req.params
    res.status(200).send(await bookService.getBook(Number(id)))
})

router.post("/", validateBody(CreateBookDto), async (req: Request, res: Response) => {
    await bookService.createBook(req.body)
    res.status(200).send()
})

export default router