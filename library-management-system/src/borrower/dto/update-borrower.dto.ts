// src/borrower/dto/create-borrower.dto.ts
import { IsNotEmpty, IsEmail, IsString, IsIn, IsInt } from 'class-validator';
import { CreateBorrowerDto } from './create-borrower.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateBorrowerDto extends PartialType(CreateBorrowerDto) {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
