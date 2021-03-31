import { createAction, props } from '@ngrx/store';
import { IdModel } from '../../../store/model/id.model';
import { Product } from '../../model/product.model';
import { UpdatedStock } from '../../model/updated-stock.model';
import { ProductImageModel } from '../../model/product-image.model';

export const actionIdentifier = '[App User Product] active';

export const ProductTypes = {
  requestAddProduct: `${actionIdentifier} Request add Product`,
  addProduct: `${actionIdentifier} add Product`,
  requestUpdateProduct: `${actionIdentifier} Request update Product`,
  updateProduct: `${actionIdentifier} update Product`,
  requestDeleteProduct: `${actionIdentifier} Request Delete Product`,
  deleteProduct: `${actionIdentifier} delete Product`,
  requestUpdateProductStock: `${actionIdentifier} Request update Product stock`,
  updateProductStock: `${actionIdentifier} update Product stock`,
  updateProductImage: `${actionIdentifier} update Product image`,
};

export const RequestAddProductAction = createAction(ProductTypes.requestAddProduct, props<Product>());
export const AddProductAction = createAction(ProductTypes.addProduct, props<Product>());

export const RequestUpdateProductAction = createAction(ProductTypes.requestUpdateProduct, props<Product>());
export const UpdateProductAction = createAction(ProductTypes.updateProduct, props<Product>());

export const RequestDeleteProductAction = createAction(ProductTypes.requestDeleteProduct, props<IdModel>());
export const DeleteProductAction = createAction(ProductTypes.deleteProduct, props<IdModel>());

export const RequestUpdateProductStockAction = createAction(ProductTypes.requestUpdateProductStock, props<UpdatedStock>());
export const UpdateProductStockAction = createAction(ProductTypes.updateProductStock, props<UpdatedStock>());

export const UpdateProductImageAction = createAction(ProductTypes.updateProductImage, props<ProductImageModel>());

