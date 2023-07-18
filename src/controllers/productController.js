import productService from "../services/productService.js";
import fs from "fs";
import * as url from "url";


class ProductController {
    constructor() {
    }

    findAll(req, res) {
        fs.readFile('views/product/list.html', 'utf-8', (err, stringHTML) => {
            let str = '';
            productService.findAll().then((products) => {
                for (const item of products) {
                    str += `<h1>${item.name}, ${item.price}</h1>`;
                }
                stringHTML = stringHTML.replace('{list}', str)
                res.write(stringHTML);
                res.end();
            })
        })
    }

    showAddForm(req, res) {
        fs.readFile('views/product/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })

    }
    add(req, res) {
        productService.save(req.body).then(() => {
            res.writeHead(301,{'location':'/api/products'})
            res.end()
        })
    }
    edit(req, res) {
        let data = '';
        req.on('data', dataRaw => {

            data += dataRaw;
        })
        req.on('end', () => {
            let urlObject = url.parse(req.url, true)
            if (req.method === 'GET') {
                fs.readFile('view/product/edit.html', 'utf-8', (err, stringHTML) => {
                    productService.findById(urlObject.query.idEdit).then((product) => {
                        stringHTML = stringHTML.replace('{id}', product.id);
                        stringHTML = stringHTML.replace('{name}', product.name);
                        stringHTML = stringHTML.replace('{age}', product.price);
                        stringHTML = stringHTML.replace('{height}', product.quantity);
                        res.write(stringHTML);
                        res.end();
                    });
                })
            } else {
                data = qs.parse(data);
                productService.update(data).then(() => {
                    res.writeHead(301, {'location': '/product'})
                    res.end()
                });
            }
        })
    }
    delete(req, res) {
        if (req.method === 'GET') {
            let urlObject = url.parse(req.url, true);
            productService.delete(urlObject.query.idDelete).then(() => {
                res.writeHead(301, {'location': '/products'})
                res.end()
            })
        }
    }
}

export default new ProductController();
