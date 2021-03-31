import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product.model';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../model/category.model';
import { getCategoriesSelector } from '../../store/selectors/cpanel.selector';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RequestUpdateProductAction, UpdateProductImageAction } from '../../store/actions/products.actions';
import { HttpEventType } from '@angular/common/http';
import { UploadFilesModel } from '../../model/upload-files.model';
import { CpanelService } from '../../service/cpanel.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductImageModel } from '../../model/product-image.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  public editProduct: Product | undefined = undefined;
  public categoryList: Category[] = [];
  public categoryAsMap: Map<number, string> = new Map<number, string>();
  public imagesToUpload: UploadFilesModel[] = [];
  public uploadFilesPress: boolean = false;
  public imageObject: Array<object> = [];

  public productForm: FormGroup = new FormGroup({
    productId: new FormControl(null),
    title: new FormControl(null, Validators.required),
    manufactured: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    stock: new FormControl(null, Validators.required),
    discountAmount: new FormControl(null),
    expireDiscount: new FormControl(null),
    categoryId: new FormControl(null, Validators.required)
  });


  constructor(private readonly store: Store<State>, private readonly route: ActivatedRoute, private readonly router: Router, private readonly cpanelService: CpanelService, private readonly sanitizer: DomSanitizer) {
  }

  private static checkTheExtension(imgName: string): boolean {
    const splitString = imgName.split('.');

    if (splitString.length == 0) return false;

    const lastPosition = splitString[splitString.length - 1];
    return lastPosition === 'png' || lastPosition === 'jpg' || lastPosition === 'jpeg'
  }

  ngOnInit(): void {
    this._loadCategories();
  }

  public onEditProduct() {
    this.store.dispatch(RequestUpdateProductAction(this.productForm.value));
    this.cancelProductEdit();
  }

  public onSelectedDate(event: MatDatepickerInputEvent<any, any>) {
    const formatDate = _moment(event.value).format('MM/DD/YYYY');
    this.productForm.get('expireDiscount').setValue(new Date(formatDate));
  }

  public allowProductForEdit() {
    this.productForm.enable({onlySelf: true})
  }

  public cancelProductEdit() {
    this.productForm.disable({onlySelf: true})
  }

  public sendData(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const currentFile = files[i];

      if (EditProductComponent.checkTheExtension(currentFile.name))
        this.imagesToUpload.push({progress: 0, image: files[i], complete: false});
    }
    this.uploadFilesPress = false;
  }

  public deleteItemFromUpload(i: number) {
    this.imagesToUpload.splice(i, 1);
  }

  public startUploadFiles() {
    this.uploadFilesPress = true;
    this.imagesToUpload.forEach((img, i) => {
      const formData: FormData = new FormData();
      formData.append('image', img.image);

      this.cpanelService.uploadImages(formData, this.editProduct.productId).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.imagesToUpload[i].progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.imagesToUpload[i].progress = 100;
          this.imagesToUpload[i].complete = true;
          this.store.dispatch(UpdateProductImageAction(event.body));
        }
      });

    });
  }

  public sanitizeImage(image: any): any {
    return 'data:image/jpeg;base64,' + image;
  }

  public prepareImageToDisplay(images: ProductImageModel[]) {
    if (!images) return;
    this.imageObject = [];
    images.forEach(i => this.imageObject.push({
      image: this.sanitizeImage(i.image),
      thumbImage: this.sanitizeImage(i.image),
      title: i.name,
      alt: i.name
    }));
  }

  private _loadCategories() {
    this.store.pipe(select(getCategoriesSelector)).subscribe(payload => {
      this.categoryList = payload.categories;
      this.categoryList.forEach(c => this.categoryAsMap.set(c.categoryId, c.categoryName));
      this._getParamFromRoute();
    });
  }

  private _getParamFromRoute() {
    this.route.params.subscribe(p => {
      const pId = p['productId']
      const categoryIndex = this.categoryList.findIndex(c => c.products?.some(p => p.productId == pId));

      if (categoryIndex == -1) {
        this.router.navigate(['/404']);
        return;
      }

      this.editProduct = this.categoryList[categoryIndex].products.find(p => p.productId == pId);
      this.productForm.patchValue(this.editProduct);
      this.productForm.disable({onlySelf: true})
      this.prepareImageToDisplay(this.editProduct.images);
    });
  }
}
