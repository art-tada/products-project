import { IsNumber, IsArray, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductNameDto {
    @IsString()
    name: string;

    @IsString()
    language: string;
}

export class ProductDescriptionDto {
    @IsString()
    description: string;

    @IsString()
    language: string;
}

export class CreateProductDto {
    @IsNumber()
    price: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductNameDto)
    names: ProductNameDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDescriptionDto)
    descriptions: ProductDescriptionDto[];
}