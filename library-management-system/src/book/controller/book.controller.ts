import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from '../service/book.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { Book } from '../entity/book.entity';
import { UpdateBookDto } from '../dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findAll() {
    return await this.booksService.findAll();
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) createBookDto: CreateBookDto,
  ): Promise<Book> {
    return await this.booksService.create(createBookDto);
  }

  @Patch()
  async update(
    @Body(new ValidationPipe()) updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return await this.booksService.update(updateBookDto);
  }
}
