import { map } from 'rxjs/operators';

export class Product {

    constructor(
        public name: string,
        public url: string,
        public price: number,
        public size: string,
        public color: string,
        public quantity: number,
        public type: string,
        public image: string,
        public categories: Array<string>,
        public description: string,
        public add_info: string,
        public reviews: Array<string>,
        public percent_discount: number,
        public tags: string
    ) {

    }

    static fromJson({ name, url, price, size, color, quantity, type, image, categories, description, add_info, reviews, percent_discount, tags }) {

        return new Product(name, url, price, size, color, quantity, type, image, categories, description, add_info, reviews, percent_discount, tags);
    }

    static fromJsonArray(json: any[]): Product[] {
        return json.map(Product.fromJson);
    }

    // static fromJsonList(array): Product[] {
    //     return array.map(json => Product.fromJson(json));
    // }
}