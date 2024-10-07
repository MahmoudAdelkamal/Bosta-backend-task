import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  isbn: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  availableQuantity: number;

  @IsNotEmpty()
  @IsString()
  shelfLocation: string;
}
