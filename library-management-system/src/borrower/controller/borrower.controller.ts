import {
  Controller,
  Post,
  Body,
  Patch,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { BorrowerService } from '../service/borrower.service';
import { CreateBorrowerDto } from '../dto/create-borrower.dto';
import { UpdateBorrowerDto } from '../dto/update-borrower.dto';

@Controller('borrowers')
export class BorrowerController {
  constructor(private readonly borrowerService: BorrowerService) {}

  @Get()
  async findAll() {
    return await this.borrowerService.findAll();
  }
  @Post()
  async create(
    @Body(new ValidationPipe()) createBorrowerDto: CreateBorrowerDto,
  ) {
    return await this.borrowerService.create(createBorrowerDto);
  }

  @Patch()
  async update(
    @Body(new ValidationPipe()) updateBorrowerDto: UpdateBorrowerDto,
  ) {
    return await this.borrowerService.updateBorrower(updateBorrowerDto);
  }
}
