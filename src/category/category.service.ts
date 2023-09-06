import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const exist = await this.findByName(createCategoryDto?.name);

    if (exist.length) {
      throw new BadRequestException('category in use');
    }

    const category = this.categoryRepo.create(createCategoryDto);

    return this.categoryRepo.save(category);
  }

  findAll() {
    return `This action returns all category`;
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.find({ where: { id } });

    return category;
  }

  async findByName(name: string) {
    const category = await this.categoryRepo.find({ where: { name } });

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const [category] = await this.findOne(id);

    const updateCategory = {
      ...category,
      ...updateCategoryDto,
    };

    if (JSON.stringify(category) === JSON.stringify(updateCategory)) {
      throw new BadRequestException('nothing change');
    }

    return this.categoryRepo.save(updateCategory);
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
