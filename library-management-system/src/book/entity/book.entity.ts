// src/books/book.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ unique: true })
  isbn: string;

  @Column()
  availableQuantity: number;

  @Column()
  shelfLocation: string;

  @Column()
  lol: string;
}
