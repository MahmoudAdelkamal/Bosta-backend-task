import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { searchPaginate } from 'src/utils/search-helper';
import { Borrower } from '../entity/borrower.entity';
import { CreateBorrowerDto } from '../dto/create-borrower.dto';
import { UpdateBorrowerDto } from '../dto/update-borrower.dto';

@Injectable()
export class BorrowerService {
  constructor(
    @InjectRepository(Borrower)
    private readonly borrowerRepository: Repository<Borrower>,
  ) {}

  async findAll() {
    const query = this.borrowerRepository.createQueryBuilder('borrower');
    const { allRecords, total } = await searchPaginate(query, {
      page: 1,
      page_size: 30,
    });
    return {
      data: allRecords,
      total: total,
      page: 1,
      page_size: 30,
      message: 'success',
    };
  }

  async create(createBorrowerDto: CreateBorrowerDto): Promise<Borrower> {
    const { email } = createBorrowerDto;
    const existingBorrower = await this.borrowerRepository.findOne({
      where: { email },
    });

    if (existingBorrower) {
      throw new ConflictException(
        `Borrower with email ${email} already exists.`,
      );
    }

    const newBorrower = this.borrowerRepository.create(createBorrowerDto);
    return await this.borrowerRepository.save(newBorrower);
  }

  async updateBorrower(
    updateBorrowerDto: UpdateBorrowerDto,
  ): Promise<Borrower> {
    const { id, email } = updateBorrowerDto;
    const borrower = await this.borrowerRepository.findOne({ where: { id } });

    if (!borrower) {
      throw new NotFoundException(`Borrower with ID ${id} not found.`);
    }

    if (email && email !== borrower.email) {
      const existingBorrower = await this.borrowerRepository.findOne({
        where: { email: email },
      });
      if (existingBorrower) {
        throw new ConflictException(
          `Borrower with email ${email} already exists.`,
        );
      }
    }

    Object.assign(borrower, updateBorrowerDto);
    return await this.borrowerRepository.save(borrower);
  }
}
