import { CreateUserDto, GetUserDto } from "../dtos";
import { Book, BorrowedBook, User } from "../entities";
import {} from '.././'
import { AppError } from "../utils/appError";

export class UserService {

    async createUser(dto: CreateUserDto): Promise<any> {
        return await User.create({
            name: dto.name
        }).save()
    }

    async getUsers(): Promise<User[]> {
        return await User.find()
    }

    async getUser(id: number): Promise<GetUserDto> {
        const user = await User.findOne({where:{id}, select:{id:true, name:true}})
        if (!user) {
            throw new AppError("User Not Found", 404)
        }

        const borrowedBooks = await BorrowedBook.find({where: {user:user}, relations:["book"]})
        
        const past = borrowedBooks.filter((bb:any) => bb.isReturned)
        const present = borrowedBooks.filter((bb:any) => !bb.isReturned)

        return {
            id: user.id,
            name: user.name,
            books: {
                past: past.length == 0 ? [] : past.map((bb:any) => ({
                    name: bb.book.name,
                    score: bb.score
                })),
                present: present.length == 0 ? [] : present.map((bb:any) => ({
                    name: bb.book.name
                }))
            }
        };
    }

    async borrowBook(userId:number, bookId:number):Promise<any> {
        const user = await User.findOne({where: {id:userId}})
        if(!user) throw new AppError("User Not Found", 404)

        const book = await Book.findOne({where: {id:bookId}})
        if(!book) throw new AppError("Book Not Found", 404)

        const alreadyBorrowed = await BorrowedBook.findOne({where:{book, user}})
        if(alreadyBorrowed) throw new AppError("User Already Borrowed This Book.", 500)

        return await BorrowedBook.create({
            book,
            user
        }).save()
    }

    async returnBook(score:number, userId:number, bookId:number):Promise<any> {
        const borrowed = await BorrowedBook.findOne({where: {userId, bookId, isReturned:false}})
        if(!borrowed) throw new AppError("There is no borrowed book for this user.", 404)

        BorrowedBook.update(
            {id:borrowed.id},
            {isReturned:true, score:score}
        )

        return true
    }   
}