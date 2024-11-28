export interface CreateProduct {
    price: number;
    names: {
        name: string;
        language: string;
    }[];
    descriptions: {
        description: string;
        language: string;
    }[];
}
