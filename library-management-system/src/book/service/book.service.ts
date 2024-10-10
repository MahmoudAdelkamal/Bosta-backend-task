import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entity/book.entity';
import { Repository, ILike, DataSource } from 'typeorm';
import { searchPaginate } from 'src/utils/search-helper';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private connection: DataSource) {}

  async findOne(id: number) {
    return await this.connection.getRepository(Book).findOne({
      where: { id },
    });
  }

  async findAll() {
    const query = this.connection
      .getRepository(Book)
      .createQueryBuilder('book');
    const { allRecords, total } = await searchPaginate(query, {
      page: 1,
      page_size: 30,
    });
    return {
      data: allRecords,
      total: total,
      page: 1,
      page_size: 30,
      message: 'success',
    };
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { isbn } = createBookDto;
    const existingBook = await this.connection.getRepository(Book).findOne({
      where: { isbn },
    });
    if (existingBook)
      throw new ConflictException(
        `This book with isbn ${isbn} already exists !`,
      );
    const newBook = this.connection.getRepository(Book).create(createBookDto);
    return await this.connection.getRepository(Book).save(newBook);
  }

  async update(updateBookDto: UpdateBookDto): Promise<Book> {
    const { id, isbn } = updateBookDto;

    const book = await this.connection
      .getRepository(Book)
      .findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    if (isbn && isbn !== book.isbn) {
      const existingBookWithIsbn = await this.connection
        .getRepository(Book)
        .findOne({
          where: { isbn },
        });
      if (existingBookWithIsbn) {
        throw new ConflictException(
          `Another book with ISBN ${isbn} already exists`,
        );
      }
    }

    Object.assign(book, updateBookDto);
    return await this.connection.getRepository(Book).save(book);
  }
}
