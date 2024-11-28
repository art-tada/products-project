import { Body, Controller, Post, Get, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto, GetProductsWithPaginationDto } from "./dtos";
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    async createProduct(@Body() body: CreateProductDto) {
        console.log('body: ', body);
        try {
            const product = await this.productsService.createProduct(body);
            console.log('product: ', product);
            return {
                status: 'success',
                data: product
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message
            };
        }
    }

    @Get()
    async getProductsWithPagination(@Query() query: GetProductsWithPaginationDto) {
        try {
            const result = await this.productsService.getProductsWithPagination(query);
            return {
                status: 'success',
                ...result
            };
        } catch (error) {
            return {
                status: 'error',
                message: error.message
            };
        }
    }
}
