import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity'; // Adjust the path as necessary
import { BooksService } from './service/book.service'; // Adjust the path as necessary
import { BooksController } from './controller/book.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]), // Register the Book entity
  ],
  providers: [BooksService], // Register the BooksService
  controllers: [BooksController], // Register the BooksController
})
export class BooksModule {}
