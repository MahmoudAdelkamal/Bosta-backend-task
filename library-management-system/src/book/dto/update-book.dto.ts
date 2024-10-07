import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends CreateBookDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
