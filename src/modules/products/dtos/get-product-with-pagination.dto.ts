import { IsOptional, IsString, IsInt, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class GetProductsWithPaginationDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    offset?;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(10)
    limit?;

    @IsOptional()
    @IsEnum(['ASC', 'DESC'])
    sort?: 'ASC' | 'DESC';
}