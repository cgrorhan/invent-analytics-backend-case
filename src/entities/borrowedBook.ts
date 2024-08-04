import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";
import { Book } from "./book";

@Entity("borrowed_books")
export class BorrowedBook extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    bookId: number;

    @ManyToOne(() => Book, book => book.borrowedBooks)
    @JoinColumn({name:"bookId"})
    book: Book;

    @Column({ type: 'int' })
    userId: number;

    @ManyToOne(() => User, user => user.borrowedBooks)
    @JoinColumn({name:"userId"})
    user: User;

    @Column({type:"int", nullable:true, default:null})
    score: number;

    @Column({type:"boolean", default:false})
    isReturned: boolean;
}