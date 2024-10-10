import {
    Controller,
    Post,
    Patch,
    Param,
    Body,
    ParseIntPipe,
  } from '@nestjs/common';
  import { CheckoutBookDTO } from '../dto/checkout-book.dto';
import { BorrowingTransactionService } from '../service/borrowing-transaction.service';
  
  @Controller('borrowing-transactions')
  export class BorrowingTransactionController {
    constructor(
      private readonly borrowingTransactionService: BorrowingTransactionService,
    ) {}
  
    /**
     * Checkout a book.
     * @param checkoutBookDto - Contains the borrowerId, bookId, and dueDate
     * @returns BorrowingTransaction - The created borrowing transaction
     */
    @Post('checkout')
    async checkoutBook(@Body() checkoutBookDto: CheckoutBookDTO) {
      return await this.borrowingTransactionService.checkoutBook(checkoutBookDto);
    }
  
    /**
     * Return a book.
     * @param transactionId - The ID of the borrowing transaction to mark as returned
     * @returns void
     */
    @Patch('return/:transactionId')
    async returnBook(
      @Param('transactionId', ParseIntPipe) transactionId: number,
    ): Promise<void> {
      return await this.borrowingTransactionService.returnBook(transactionId);
    }
  }
  