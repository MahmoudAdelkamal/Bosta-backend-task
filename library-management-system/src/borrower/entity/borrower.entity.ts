import { BorrowingTransaction } from 'src/borrowing-transaction/entity/borrower-transaction.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('borrower')
export class Borrower {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @CreateDateColumn({
    name: 'registered_date',
    nullable: false,
    type: 'timestamp with time zone',
  })
  registered_date: Date;

  @OneToMany(() => BorrowingTransaction, (transaction) => transaction.borrower)
  transactions: BorrowingTransaction[];
}
