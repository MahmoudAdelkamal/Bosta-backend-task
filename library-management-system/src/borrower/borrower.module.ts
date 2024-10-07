import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrower } from './entity/borrower.entity';
import { BorrowerService } from './service/borrower.service';
import { BorrowerController } from './controller/borrower.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Borrower])],
  providers: [BorrowerService],
  controllers: [BorrowerController],
})
export class BorrowerModule {}
