import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/decorator/public.decorator';
import { RolesGuard } from 'src/role/roles.guard';
import { CreateProductDto } from './dtos/create-product.dto';
import { PaginationDto } from './dtos/pagination-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';
import { ResponseProductDto } from './dtos/response-product.dto';

@ApiTags('Product')
@UseGuards(AuthGuard, RolesGuard)
@Controller('product')
@ApiBearerAuth('JWT')
// @Roles(Role.Admin)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @ApiCreatedResponse({ description: 'created product successfully' })
  async addProduct(@Body() body: CreateProductDto) {
    const product = await this.productService.create(body);

    return product;
  }

  @Get()
  @Public()
  @ApiResponse({
    status: 200,
    description: 'Get product successfully',
    type: ResponseProductDto,
  })
  @ApiExtraModels(PaginationDto)
  async getProduct(@Query() query: PaginationDto) {
    const listProduct = await this.productService.get(query);

    return listProduct;
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.delete(id);
  }

  @Patch('/:id')
  updateProduct(@Param('id') id: number, @Body() body: UpdateProductDto) {
    const product = this.productService.update(id, body);

    return product;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'file' is keyname in postman
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateProductDto,
  ) {
    return await this.productService.upload(
      file?.buffer,
      file?.originalname,
      body,
    );
  }
}
