import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './product.entity';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private configService: ConfigService,
    private categoryService: CategoryService,
  ) {}

  async create(body: CreateProductDto) {
    const isExistProduct = await this.findByName(body?.name);

    const existCategory = await this.categoryService.findOne(+body?.categoryId);

    if (!existCategory.length) {
      throw new BadRequestException('category not found');
    }

    if (!isExistProduct.length) {
      const product = this.productRepo.create({
        ...body,
      });
      return this.productRepo.save(product);
    }

    throw new BadRequestException('product name in use');
  }

  async getAll() {
    return await this.productRepo.createQueryBuilder('getProduct').getMany();
  }

  findByName(name: string) {
    const product = this.productRepo.find({ where: { name } });

    return product;
  }

  findById(id: number) {
    const product = this.productRepo.find({ where: { id } });

    return product;
  }

  async upload(
    dataBuffer: Buffer,
    originalName: string,
    body: CreateProductDto,
  ) {
    const s3 = new S3({
      region: this.configService.get('AWS_REGION'),
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    });
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: String(originalName),
      Body: JSON.stringify(dataBuffer),
    };

    await s3.upload(params).promise();

    // return new Promise((resolve, reject) => {
    //   s3.upload(params, (err, data) => {
    //     if (err) {
    //       Logger.error(err);
    //       reject(err.message);
    //     }
    //     resolve(data);
    //   });
    // });

    const product = this.create(body);

    return product;
  }

  async delete(id: number) {
    const [product] = await this.findById(id);

    if (!product) {
      throw new BadRequestException('Invalid product');
    }

    return this.productRepo.remove(product);
  }

  async update(id: number, body: UpdateProductDto) {
    const [product] = await this.findById(id);

    if (!product) {
      throw new BadRequestException('Invalid product');
    }

    const existCategory = await this.categoryService.findOne(+body?.categoryId);

    if (!existCategory.length) {
      throw new BadRequestException('category not found');
    }

    Object.assign(product, body);

    return this.productRepo.save(product);
  }
}
//
