import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { BorrowerService } from 'src/borrower/service/borrower.service';
import { Book } from 'src/book/entity/book.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { BorrowingTransactionService } from './service/borrowing-transaction.service';
import { CheckoutBookDTO } from './dto/checkout-book.dto';
import { BorrowingTransaction } from './entity/borrower-transaction.entity';
import { BooksService } from 'src/book/service/book.service';

describe('BorrowingTransactionService', () => {
  let service: BorrowingTransactionService;
  let bookService: Partial<BooksService>;
  let borrowerService: Partial<BorrowerService>;
  let dataSource: Partial<DataSource>;

  beforeEach(async () => {
    bookService = {
      findOne: jest.fn(),
    };
    borrowerService = {
      findOne: jest.fn(),
    };
    dataSource = {
      getRepository: jest.fn().mockReturnValue({
        save: jest.fn(),
        findOne: jest.fn(),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BorrowingTransactionService,
        { provide: BooksService, useValue: bookService },
        { provide: BorrowerService, useValue: borrowerService },
        { provide: DataSource, useValue: dataSource },
      ],
    }).compile();

    service = module.get<BorrowingTransactionService>(
      BorrowingTransactionService,
    );
  });

  describe('checkoutBook', () => {
    it('should successfully check out a book', async () => {
      const mockBook: Book = { id: 1, availableQuantity: 3 } as Book;
      const mockBorrower = { id: 1 };
      const dto: CheckoutBookDTO = {
        borrowerId: 1,
        bookId: 1,
        dueDate: '2024-12-31T00:00:00Z',
      };

      (bookService.findOne as jest.Mock).mockResolvedValue(mockBook);
      (borrowerService.findOne as jest.Mock).mockResolvedValue(mockBorrower);

      const mockSave = jest.fn();
      (dataSource.getRepository as jest.Mock).mockReturnValue({
        save: mockSave,
      });

      const result = await service.checkoutBook(dto);

      expect(result).toBeDefined();
      expect(mockSave).toHaveBeenCalledTimes(2);
      expect(mockBook.availableQuantity).toBe(2);
    });

    it('should throw NotFoundException if borrower does not exist', async () => {
      const dto: CheckoutBookDTO = {
        borrowerId: 1,
        bookId: 1,
        dueDate: '2024-12-31T00:00:00Z',
      };

      (borrowerService.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.checkoutBook(dto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException if due date is in the past', async () => {
      const dto: CheckoutBookDTO = {
        borrowerId: 1,
        bookId: 1,
        dueDate: '2022-01-01T00:00:00Z', // Past date
      };

      await expect(service.checkoutBook(dto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('returnBook', () => {
    it('should successfully return a book', async () => {
      const mockTransaction: BorrowingTransaction = {
        id: 1,
        bookId: 1,
        borrowerId: 1,
        checkoutDate: new Date(),
        dueDate: new Date(),
        returnDate: null,
        book: { id: 1, availableQuantity: 1 } as Book,
      };

      const mockSave = jest.fn();
      (dataSource.getRepository as jest.Mock).mockReturnValue({
        save: mockSave,
        findOne: jest.fn().mockResolvedValue(mockTransaction),
      });

      await service.returnBook(1);

      expect(mockSave).toHaveBeenCalledTimes(2);
      expect(mockTransaction.book.availableQuantity).toBe(2);
      expect(mockTransaction.returnDate).toBeDefined();
    });

    it('should throw NotFoundException if transaction not found', async () => {
      (dataSource.getRepository as jest.Mock).mockReturnValue({
        findOne: jest.fn().mockResolvedValue(null),
      });

      await expect(service.returnBook(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if the book is already returned', async () => {
      const mockTransaction: BorrowingTransaction = {
        id: 1,
        bookId: 1,
        borrowerId: 1,
        checkoutDate: new Date(),
        dueDate: new Date(),
        returnDate: new Date(),
        book: { id: 1, availableQuantity: 1 } as Book,
      };

      (dataSource.getRepository as jest.Mock).mockReturnValue({
        findOne: jest.fn().mockResolvedValue(mockTransaction),
      });

      await expect(service.returnBook(1)).rejects.toThrow(NotFoundException);
    });
  });
});
