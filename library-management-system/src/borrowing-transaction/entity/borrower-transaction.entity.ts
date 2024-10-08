import { Book } from 'src/book/entity/book.entity';
import { Borrower } from 'src/borrower/entity/borrower.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
@Entity('borrowing_transactions')
export class BorrowingTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ManyToOne(() => Borrower, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'borrowerId' })
  borrower: Borrower;

  @Column()
  checkoutDate: Date;

  @Column()
  dueDate: Date;

  @Column({ nullable: true })
  returnDate: Date;

  @Column()
  borrowerId: number;

  @Column()
  bookId: number;
}
