import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ProductName } from "./product-names.model";
import { ProductDescription } from "./product-descriptions.model";

@Table({
    paranoid: true,
    timestamps: true,
    underscored: true,
})
export class Product extends Model<Product> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column(
        DataType.FLOAT
    )
    price: number | null;

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

    @HasMany(() => ProductName, {})
    productNames: ProductName[];

    @HasMany(() => ProductDescription, {})
    productDescriptions: ProductDescription[];
}
