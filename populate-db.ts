import { AngularFireDatabase } from "@angular/fire/database";
import { environment } from "./src/environments/environment";
import { dbData } from "./db-data";

console.log("WARNING VERY IMPORTANT - PLEASE READ THIS\n\n\n");
console.log('WARNING Please set your own firebase config on src/environmnents/firebase.config.ts');
console.log('Otherwise you will get permissions errors, because the populate-db script is trying to write to my database instead of yours. ');
console.log('Any issues please contact me, Thanks, Vasco\n\n\n');

let db: AngularFireDatabase;

const productsRef = db.database.ref('products');
dbData.products.forEach(product => {
    console.log('adding product', product.url);

    const productRef = productsRef.push({
        name: product.name,
        url: product.url,
        price: product.price,
        size: product.size,
        color: product.color,
        quantity: product.quantity,
        type: product.type,
        categories: product.categories,
        description: product.description,
        add_info: product.add_info,
        reviews: product.reviews,
        tags: product.tags
    });
});