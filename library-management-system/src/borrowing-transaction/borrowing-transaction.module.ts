import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowingTransaction } from './entity/borrower-transaction.entity';
import { BorrowingTransactionService } from './service/borrowing-transaction.service';
import { BorrowingTransactionController } from './controller/borrowing-transaction.controller';
import { BorrowerModule } from 'src/borrower/borrower.module';
import { BooksModule } from 'src/book/book.module';
import { BooksService } from 'src/book/service/book.service';
import { BorrowerService } from 'src/borrower/service/borrower.service';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowingTransaction]), BooksModule],
  providers: [BorrowingTransactionService, BooksService, BorrowerService],
  controllers: [BorrowingTransactionController],
})
export class BorrowingTransactionModule {}
