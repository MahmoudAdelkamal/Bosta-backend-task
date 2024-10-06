// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './book/book.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'Octane',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Automatically load all entities
      synchronize: true, // Set to false in production
    }),
    BooksModule,
  ],
})
export class AppModule {}
