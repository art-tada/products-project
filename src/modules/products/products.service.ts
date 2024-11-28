import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { ProductDescription, ProductName } from "src/database/models";
import { Op, Sequelize, Transaction, WhereOptions } from "sequelize";
import { CreateProduct, GetProductsFilter } from "./interfaces";
import { InjectConnection } from "@nestjs/sequelize";
import { GetProductsWithPaginationDto } from "./dtos";

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository,
        @InjectConnection() private readonly sequelize: Sequelize
    ) { }

    async createProduct(productData: CreateProduct) {
        try {
            const result = await this.sequelize.transaction(async (t) => {
                const product = await this.productsRepository.createProduct({
                    price: productData.price,
                    createdBy: "member",
                    updatedBy: "member",
                }, t);

                if (productData.names && productData.names.length > 0) {
                    const namesData = productData.names.map(name => ({
                        productId: product.id,
                        name: name.name,
                        language: name.language,
                        createdBy: "member",
                        updatedBy: "member"
                    }));
                    await this.productsRepository.createProductNames(namesData, t);
                }

                if (productData.descriptions && productData.descriptions.length > 0) {
                    const descriptionsData = productData.descriptions.map(desc => ({
                        productId: product.id,
                        description: desc.description,
                        language: desc.language,
                        createdBy: "member",
                        updatedBy: "member"
                    }));
                    await this.productsRepository.createProductDescriptions(descriptionsData, t);
                }

                return await this.productsRepository.getProduct(
                    { id: product.id },
                    [
                        { model: ProductName },
                        { model: ProductDescription }
                    ],
                    t
                );
            });

            return result;
        } catch (error) {
            console.error('[ProductsService][createProduct] error: ', error);

            throw new Error('server error')
        }

    }

    async getProductsWithPagination(query: GetProductsWithPaginationDto) {
        try {
            const { offset = 0, limit = 10, name, sort = 'DESC' } = query;
            const whereConditions: any = {};
            const nameWhereConditions: any = {};

            if (name) {
                nameWhereConditions.name = { [Op.iLike]: `%${name}%` };
            }

            const { rows: products, count: total } = await this.productsRepository.findAndCountProducts({
                where: whereConditions,
                include: [
                    {
                        model: ProductName,
                        where: Object.keys(nameWhereConditions).length > 0 ? nameWhereConditions : undefined,
                    },
                ],
                order: [['created_at', sort]],
                limit,
                offset,
                distinct: true
            });

            return {
                data: products,
                meta: {
                    offset,
                    limit,
                    total,
                }
            };
        } catch (error) {
            console.error('[ProductsService][getProducts] error: ', error);
            throw new Error('server error');
        }
    }
}
