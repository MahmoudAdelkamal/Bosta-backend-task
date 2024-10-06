import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entity/book.entity'; // Adjust the path as necessary
import { Repository, ILike } from 'typeorm';
import { searchPaginate } from 'src/utils/search-helper';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) // Inject the Book repository directly
    private readonly bookRepository: Repository<Book>, // Use Repository<Book> type
  ) {}

  // Get all books
  async findAllBooks() {
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
}
