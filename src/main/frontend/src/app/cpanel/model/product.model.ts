import { ProductImageModel } from './product-image.model';
import { ProductComments } from './product-comments.model';

export interface Product {
  productId: number;
  title: string;
  manufactured: string;
  description: string;
  price: number;
  stock: number;
  warranty: number;
  numOfRatingCustomers: number;
  totalRating: number;
  discountAmount: number;
  expireDiscount: Date;
  categoryId: number;
  dateCreated: Date;
  images: ProductImageModel[];
  productComments: ProductComments[];
}
