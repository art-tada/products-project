import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product, ProductName, ProductDescription } from './database/models';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        models: [
          Product,
          ProductName,
          ProductDescription
        ]
      }),
      inject: [ConfigService]
    }),
    ProductsModule],
})
export class AppModule { }
