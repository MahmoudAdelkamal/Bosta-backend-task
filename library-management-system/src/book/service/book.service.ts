import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entity/book.entity';
import { Repository, ILike } from 'typeorm';
import { searchPaginate } from 'src/utils/search-helper';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

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
