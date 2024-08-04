import { Router, Request, Response } from 'express' 
import { validateBody } from '../utils/validateBody'
import { CreateUserDto } from '../dtos'
import { UserService } from '../services'
import { ReturnBookDto } from '../dtos/returnBookDto'

const router = Router()
const userService = new UserService()

router.get("/", async(req:Request, res:Response, next:any) => {
    try {
        res.status(200).send(await userService.getUsers())
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async(req:Request, res:Response,next:any) => {
    try {
        const { id } = req.params
        res.status(200).send(await userService.getUser(Number(id)))
    } catch (error) {
        next(error)
    }
})

router.post("/", validateBody(CreateUserDto), async(req:Request, res:Response,next:any) => {
    try {
        await userService.createUser(req.body)
        res.status(200).send()
    } catch (error) {
        next(error)
    }
})

router.post("/:id/borrow/:bookId", async(req:Request, res:Response, next:any) => {
    try {
        const { id, bookId } = req.params
        res.status(200).send(await userService.borrowBook(Number(id), Number(bookId)))
    } catch (error) {
        next(error)
    }
})

router.post("/:id/return/:bookId", validateBody(ReturnBookDto),async(req:Request, res:Response, next:any) => {
    try {
        const { id, bookId } = req.params
        const { score } = req.body
        res.status(200).send(await userService.returnBook(score,Number(id), Number(bookId)))
    } catch (error) {
        next(error)
    }
})

export default router