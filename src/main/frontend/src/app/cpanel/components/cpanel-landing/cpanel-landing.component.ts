import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from '../../../store/model/root.state';
import { UploadFilesModel } from '../../model/upload-files.model';
import { HttpEventType } from '@angular/common/http';
import { CpanelService } from '../../service/cpanel.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  RequestAddCategoryAction,
  RequestDeleteCategoryAction,
  RequestUpdateCategoryAction
} from '../../store/actions/categories.actions';
import { Category } from '../../model/category.model';
import { getCategoriesSelector } from '../../store/selectors/cpanel.selector';
import { DEFAULT_CONFIRM_MESSAGE } from '../../../app-constants';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';
import { MatSelectChange } from '@angular/material/select';
import { Product } from '../../model/product.model';
import { MatTableDataSource } from '@angular/material/table';
import { RequestDeleteProductAction, RequestUpdateProductStockAction } from '../../store/actions/products.actions';

@Component({
  selector: 'app-cpanel-landing',
  templateUrl: './cpanel-landing.component.html',
  styleUrls: ['./cpanel-landing.component.scss']
})
export class CpanelLandingComponent implements OnInit {

  public categoryForm: FormGroup = new FormGroup({
    categoryId: new FormControl(null),
    categoryName: new FormControl(null, Validators.required),
  });

  public categoryList: Category[] = [];
  public productList: Product[] = [];
  private categoryEdit: boolean = false;
  public imagesToUpload: UploadFilesModel[] = [];
  public images: any[] = [];
  public displayedColumns: string[] = ['position', 'friendly', 'manufactured', 'stock', 'price', 'goTo', 'delete'];
  public dataSource: any;

  constructor(private readonly store: Store<State>, private readonly cpanelService: CpanelService, private readonly sanitizer: DomSanitizer, private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.store.pipe(select(getCategoriesSelector)).subscribe(payload => {
      this.categoryList = payload.categories;
      let products = [];
      this.categoryList.forEach(c => products = [...products, ...c.products])
      this.dataSource = new MatTableDataSource(products);
    });
  }


  public sendData(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const currentFile = files[i];

      if (this.checkTheExtension(currentFile.name))
        this.imagesToUpload.push({progress: 0, image: files[i], complete: false});
    }
  }

  public deleteItemFromUpload(i: number) {
    this.imagesToUpload.splice(i, 1);
  }

  public startUploadFiles() {
    this.imagesToUpload.forEach((img, i) => {
      const formData: FormData = new FormData();
      formData.append('image', img.image);

      this.cpanelService.uploadImages(formData, 1).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.imagesToUpload[i].progress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.imagesToUpload[i].progress = 100;
          this.imagesToUpload[i].complete = true;
        }
      });

    });
  }

  public displayImages() {
    this.cpanelService.getAllImages().subscribe(resp => {
      resp.forEach(i => {
        let objectURL = 'data:image/jpeg;base64,' + i.image;
        this.images.push(this.sanitizer.bypassSecurityTrustUrl(objectURL))
      })
    })
  }

  private checkTheExtension(imgName: string): boolean {
    const splitString = imgName.split('.');

    if (splitString.length == 0) return false;

    const lastPosition = splitString[splitString.length - 1];
    return lastPosition === 'png' || lastPosition === 'jpg' || lastPosition === 'jpeg'
  }


  public onAddCategory() {
    if (this.categoryEdit) {
      this.store.dispatch(RequestUpdateCategoryAction(this.categoryForm.value));
    } else {
      this.store.dispatch(RequestAddCategoryAction(this.categoryForm.value));
    }
    this.categoryEdit = false;
    this.categoryForm.reset();
  }

  public onEditCategory(category: Category) {
    this.categoryEdit = true;
    this.categoryForm.patchValue(category);
  }

  public onDeleteCategory(categoryId: number) {
    if (!confirm(DEFAULT_CONFIRM_MESSAGE) || categoryId == null) return;

    this.store.dispatch(RequestDeleteCategoryAction({id: categoryId}));
  }

  public addProduct() {
    this.dialog.open(CreateProductComponent, {width: '650px', disableClose: true});
  }

  public filterByCategory(event: MatSelectChange) {
    let products: Product[] = [];
    this.categoryList.forEach(c => products = [...products, ...c.products])

    if (event.value == 0) {
      this.dataSource = new MatTableDataSource(products);
      return;
    }

    const filteredValue = products.slice().filter(p => p.categoryId == event.value);
    this.dataSource = new MatTableDataSource(filteredValue);
  }

  public onDeleteProduct(productId: number) {
    if (!confirm(DEFAULT_CONFIRM_MESSAGE) || productId == null) return;

    this.store.dispatch(RequestDeleteProductAction({id: productId}));
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeStock(event: any, productId: number) {
    const stockValue = event.value;
    if (stockValue < 0) return;

    this.store.dispatch(RequestUpdateProductStockAction({productId: productId, stock: stockValue}))
  }
}
