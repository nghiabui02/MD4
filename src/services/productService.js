import db from "../config/database.js";
import connection from "mysql/lib/Pool.js";

class ProductService {
    constructor() {
    }

    findAll() {
        return new Promise((resolve, reject) => {
            db.query('select * from product', (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        })
    }

    save(product) {
        return new Promise((resolve, reject) => {
            db.query(`insert into product values (${product.id}, '${product.name}', ${product.price}, ${product.quantity});`, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
    findById(id) {
    }
    update(product) {
        return new Promise((resolve, reject) => {
            db.query(
                `update product 
                        set     
                        id  = ${product.id},
                        name = '${product.name}', 
                        price= ${product.price}, 
                        quantity= ${product.quantity}, 
                    where id = ${product.id}`, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
        })
    }
    delete(idDelete) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM product WHERE id = ${idDelete}`, (err, delProduct) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(delProduct);
                }
            });
        });
    }
}

export default new ProductService();
