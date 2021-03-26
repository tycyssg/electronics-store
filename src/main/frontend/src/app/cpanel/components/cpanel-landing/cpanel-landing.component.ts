import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getAuthSelector } from '../../../auth/store/selectors/auth.selectors';
import { State } from '../../../store/model/root.state';
import { UploadFilesModel } from '../../model/upload-files.model';
import { HttpEventType } from '@angular/common/http';
import { CpanelService } from '../../service/cpanel.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cpanel-landing',
  templateUrl: './cpanel-landing.component.html',
  styleUrls: ['./cpanel-landing.component.scss']
})
export class CpanelLandingComponent implements OnInit {

  public imagesToUpload: UploadFilesModel[] = [];
  public images: any[] = [];

  constructor(private readonly store: Store<State>, private readonly cpanelService: CpanelService, private readonly sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.store.pipe(select(getAuthSelector)).subscribe(payload => {
    })
    console.log(HttpEventType.UploadProgress)
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

}
