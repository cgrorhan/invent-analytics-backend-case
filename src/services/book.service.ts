import { CreateBookDto } from "../dtos";
import { GetBookDto } from "../dtos/getBookDto";
import { Book } from "../entities";
import { AppError } from "../utils/appError";

export class BookService {

    async getBooks(): Promise<Book[]> {
        return await Book.find()
    }

    async getBook(id: number): Promise<GetBookDto> {
        const book = await Book.createQueryBuilder('book')
            .leftJoin('book.borrowedBooks', 'borrowedBook')
            .select('book.id', 'id')
            .addSelect('book.name', 'name')
            .addSelect('AVG(borrowedBook.score)', 'score')
            .where('book.id = :id', { id })
            .groupBy('book.id')
            .getRawOne();

        if (!book) {
            throw new AppError("Book Not Found", 404)
        }

        const score = parseFloat(book.score).toFixed(2)

        return {
            id: book.id,
            name: book.name,
            score: score == "NaN" ? -1 : score
        };
    }

    async createBook(dto: CreateBookDto): Promise<any> {
        return await Book.create({
            name: dto.name
        }).save()
    }
}