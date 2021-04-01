import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../cpanel/model/product.model';

@Pipe({
  name: 'productFilter',
  pure: false
})
export class ProductFilter implements PipeTransform {
  transform(items: Product[], filterValue: any): Product[] {
    if (!items || !filterValue) {
      return items;
    }

    const regexp = new RegExp(filterValue, 'i');
    return items.filter(item => regexp.test(item.title) || regexp.test(item.manufactured));
  }
}
