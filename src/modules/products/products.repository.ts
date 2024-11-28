

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindAndCountOptions, Transaction, WhereOptions } from "sequelize";
import { Product, ProductDescription, ProductName } from "src/database/models";

@Injectable()
export class ProductsRepository {
    constructor(@InjectModel(Product) private readonly productModel: typeof Product,
        @InjectModel(ProductName) private readonly productNameModel: typeof ProductName,
        @InjectModel(ProductDescription) private readonly productDescriptionModel: typeof ProductDescription) { }

    async createProduct(product: {
        price: number,
        createdBy: string,
        updatedBy: string
    }, transaction?: Transaction) {
        return this.productModel.create(product, { transaction });
    }

    async createProductNames(names: Array<{
        productId: number,
        name: string,
        language: string,
        createdBy: string,
        updatedBy: string
    }>, transaction?: Transaction) {
        return this.productNameModel.bulkCreate(names, { transaction });
    }

    async createProductDescriptions(descriptions: Array<{
        productId: number,
        description: string,
        language: string,
        createdBy: string,
        updatedBy: string
    }>, transaction?: Transaction) {
        return this.productDescriptionModel.bulkCreate(descriptions, { transaction });
    }

    async getProduct(whereOptions?: WhereOptions<Product>, include?: any[], transaction?: Transaction) {
        return this.productModel.findOne({ where: whereOptions, include, transaction });
    }

    async findAndCountProducts(options: FindAndCountOptions<Product>) {
        return this.productModel.findAndCountAll(options);
    }
}
