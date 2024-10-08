import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CheckoutBookDTO {
  @IsNotEmpty()
  @IsNumber()
  borrowerId: number;

  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;
}
