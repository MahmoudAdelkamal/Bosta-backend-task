// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './book/book.module';
import { BorrowerModule } from './borrower/borrower.module';
import { BorrowingTransactionModule } from './borrowing-transaction/borrowing-transaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5555,
      username: 'postgres',
      password: 'postgres',
      database: 'Octane',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Automatically load all entities
      synchronize: true, // Set to false in production
    }),
    BooksModule,
    BorrowerModule,
    BorrowingTransactionModule,
  ],
})
export class AppModule {}
