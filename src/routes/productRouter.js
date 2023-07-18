import{Router} from 'express';
import productController from "../controllers/productController.js";
const productRouter = Router();

productRouter.get('', productController.findAll);
productRouter.post('', productController.add);
productRouter.get('/add', productController.showAddForm);
productRouter.get('/edit', productController.delete);
productRouter.get('/add', productController.edit);

export default productRouter;
