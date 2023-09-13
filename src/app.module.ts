import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order_detail/order_detail.module';
import { ProductModule } from './products/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOSTNAME || 'postgres://admin:HGKCl2HMPSqBYDMh2qk20qk9SCpt2EjT@dpg-ck0mcob6fquc738499d0-a.singapore-postgres.render.com/demo_pj',
      port: 5432,
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || 'HGKCl2HMPSqBYDMh2qk20qk9SCpt2EjT',
      database: process.env.DB_DATABASE || 'demo_pj',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ConfigModule.forRoot({}),
    UserModule,
    AuthModule,
    OrderModule,
    ProductModule,
    AddressModule,
    CategoryModule,
    OrderDetailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
