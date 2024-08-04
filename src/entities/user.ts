import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BorrowedBook } from "./borrowedBook";

@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("identity")
    id: number

    @Column({type:"varchar", length:255, nullable:false, default:""})
    name:string

    @OneToMany(() => BorrowedBook, borrowedBook => borrowedBook.book)
    @JoinColumn({name:"borrowedBookId"})
    borrowedBooks: BorrowedBook[];
}