import{Router} from 'express';
import productController from "../controllers/productController.js";
const productRouter = Router();

productRouter.get('', productController.findAll);
productRouter.post('', productController.add);
productRouter.get('/add', productController.showAddForm);
productRouter.get('/delete', productController.delete);
productRouter.get('/update', productController.edit);

export default productRouter;
