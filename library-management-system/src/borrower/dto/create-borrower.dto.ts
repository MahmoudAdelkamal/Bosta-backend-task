// src/borrower/dto/create-borrower.dto.ts
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateBorrowerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
