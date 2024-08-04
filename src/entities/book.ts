import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { BorrowedBook } from './borrowedBook';

@Entity("books")
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"text", nullable:false, default:""})
    name: string;

    @OneToMany(() => BorrowedBook, borrowedBook => borrowedBook.book)
    borrowedBooks: BorrowedBook[];
}