import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BorrowingTransaction } from '../entity/borrower-transaction.entity';
import { DataSource, Repository } from 'typeorm';
import { Book } from 'src/book/entity/book.entity';
import { CheckoutBookDTO } from '../dto/checkout-book.dto';
import { BooksService } from 'src/book/service/book.service';
import { BorrowerService } from 'src/borrower/service/borrower.service';

@Injectable()
export class BorrowingTransactionService {
  constructor(
    private connection: DataSource,
    private bookService: BooksService,
    private borrowerService: BorrowerService,
  ) {}

  async checkoutBook(
    checkoutBookDto: CheckoutBookDTO,
  ): Promise<BorrowingTransaction> {
    const { borrowerId, bookId, dueDate } = checkoutBookDto;

    const borrower = await this.borrowerService.findOne(borrowerId);
    if (!borrower) {
      throw new NotFoundException('Borrower not found');
    }

    const book = await this.bookService.findOne(bookId);
    if (!book || book.availableQuantity <= 0) {
      throw new NotFoundException('Book not available');
    }

    const currentDate = new Date();
    const dueDateObject = new Date(dueDate);
    if (dueDateObject <= currentDate) {
      throw new BadRequestException(
        'Due date must be later than the checkout date',
      );
    }

    const transaction = new BorrowingTransaction();
    transaction.bookId = bookId;
    transaction.borrowerId = borrowerId;
    transaction.checkoutDate = currentDate;
    transaction.dueDate = dueDateObject;

    book.availableQuantity--;
    await this.connection.getRepository(Book).save(book);

    return await this.connection
      .getRepository(BorrowingTransaction)
      .save(transaction);
  }

  async returnBook(transactionId: number): Promise<void> {
    const transaction = await this.connection
      .getRepository(BorrowingTransaction)
      .findOne({
        where: { id: transactionId },
        relations: ['book'],
      });
    if (!transaction) throw new NotFoundException(`transaction is not found !`);

    if (transaction.returnDate) {
      throw new NotFoundException(
        'Transaction not found or book already returned',
      );
    }

    transaction.returnDate = new Date();
    await this.connection.getRepository(BorrowingTransaction).save(transaction);

    const book = transaction.book;
    book.availableQuantity++;
    await this.connection.getRepository(Book).save(book);
  }
}
