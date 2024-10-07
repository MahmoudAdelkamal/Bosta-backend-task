import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entity/book.entity';
import { Repository, ILike } from 'typeorm';
import { searchPaginate } from 'src/utils/search-helper';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll() {
    const query = this.bookRepository.createQueryBuilder('book');
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
    const existingBook = await this.bookRepository.findOne({
      where: { isbn },
    });
    if (existingBook)
      throw new ConflictException(
        `This book with isbn ${isbn} already exists !`,
      );
    const newBook = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(newBook);
  }

  async update(updateBookDto: UpdateBookDto): Promise<Book> {
    const { id, isbn } = updateBookDto;

    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    if (isbn && isbn !== book.isbn) {
      const existingBookWithIsbn = await this.bookRepository.findOne({
        where: { isbn },
      });
      if (existingBookWithIsbn) {
        throw new ConflictException(
          `Another book with ISBN ${isbn} already exists`,
        );
      }
    }

    Object.assign(book, updateBookDto);
    return await this.bookRepository.save(book);
  }
}
