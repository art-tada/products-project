import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product, ProductName, ProductDescription } from 'src/database/models';


@Module({
    imports: [SequelizeModule.forFeature([Product, ProductName, ProductDescription])],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository],
})
export class ProductsModule { }
