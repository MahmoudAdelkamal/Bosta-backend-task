import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowingTransaction } from '../entity/borrower-transaction.entity';
import { Repository } from 'typeorm';
import { Book } from 'src/book/entity/book.entity';
import { Borrower } from 'src/borrower/entity/borrower.entity';
import { CheckoutBookDTO } from '../dto/checkout-book.dto';

@Injectable()
export class BorrowingTransactionService {
  constructor(
    @InjectRepository(BorrowingTransaction)
    private readonly borrowingTransactionRepository: Repository<BorrowingTransaction>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Borrower)
    private readonly borrowerRepository: Repository<Borrower>,
  ) {}

  async checkoutBook(
    checkoutBookDto: CheckoutBookDTO,
  ): Promise<BorrowingTransaction> {
    const { borrowerId, bookId, dueDate } = checkoutBookDto;

    const borrower = await this.borrowerRepository.findOne({
      where: { id: borrowerId },
    });
    if (!borrower) {
      throw new NotFoundException('Borrower not found');
    }

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
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
    await this.bookRepository.save(book);

    return await this.borrowingTransactionRepository.save(transaction);
  }

  async returnBook(transactionId: number): Promise<void> {
    const transaction = await this.borrowingTransactionRepository.findOne({
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
    await this.borrowingTransactionRepository.save(transaction);

    const book = transaction.book;
    book.availableQuantity++;
    await this.bookRepository.save(book);
  }
}
