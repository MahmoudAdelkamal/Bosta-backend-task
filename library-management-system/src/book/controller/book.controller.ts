import { Controller, Get } from '@nestjs/common';
import { BooksService } from '../service/book.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAllBooks() {
    return await this.booksService.findAllBooks();
  }
}
