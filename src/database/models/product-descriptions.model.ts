import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './products.model';

@Table({
    paranoid: true,
    timestamps: true,
    underscored: true,
})
export class ProductDescription extends Model<ProductDescription> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Product)
    @Column(DataType.INTEGER)
    productId: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    description: string;

    @Column({ type: DataType.STRING(255), allowNull: false })
    language: string;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    createdAt: Date;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    updatedAt: Date;

    @Column({ type: DataType.STRING(255), allowNull: false })
    createdBy: string;

    @Column({ type: DataType.STRING(255), allowNull: false })
    updatedBy: string;

    @Column(DataType.STRING(255))
    deletedBy: string | null;

    @Column(DataType.DATE)
    deletedAt: Date | null;

    @BelongsTo(() => Product)
    product: Product;
}