import { createAction, props } from '@ngrx/store';
import { IdModel } from '../../../store/model/id.model';
import { Product } from '../../model/product.model';
import { UpdatedStock } from '../../model/updated-stock.model';
import { ProductImageModel } from '../../model/product-image.model';
import { UpdatedRating } from '../../model/updated-rating.model';
import { ProductComments } from '../../model/product-comments.model';

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
  requestAddProductRating: `${actionIdentifier} Request add Product rating`,
  addProductRating: `${actionIdentifier} add Product rating`,
  requestAddProductComment: `${actionIdentifier} Request add Product Comment`,
  addProductComment: `${actionIdentifier} add Product Comment`,
  requestSimulateBuy: `${actionIdentifier} Request simulate buy Product`,
  simulateBuy: `${actionIdentifier} simulate buy Product`,
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

export const RequestAddProductRatingAction = createAction(ProductTypes.requestAddProductRating, props<UpdatedRating>());
export const AddProductRatingAction = createAction(ProductTypes.addProductRating, props<UpdatedRating>());

export const RequestAddProductCommentAction = createAction(ProductTypes.requestAddProductComment, props<ProductComments>());
export const AddProductCommentAction = createAction(ProductTypes.addProductComment, props<ProductComments>());

export const RequestSimulateBuyAction = createAction(ProductTypes.requestSimulateBuy, props<UpdatedStock>());
export const SimulateBuyAction = createAction(ProductTypes.simulateBuy, props<UpdatedStock>());
