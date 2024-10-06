import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { BooksService } from '../service/book.service'; // Adjust the path as necessary
import { Book } from '../entity/book.entity'; // Adjust the path as necessary

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAllBooks() {
    return await this.booksService.findAllBooks();
  }
}
